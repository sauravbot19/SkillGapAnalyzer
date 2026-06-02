package com.skillgap.analyzer.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.Objects;

/**
 * To handle downloading PDF files from S3 and extracting plain text using Apache PDFBox.
 * This implementation is defensive: validates inputs, parses filename robustly, and uses
 * try-with-resources to ensure streams and documents are always closed.
 */
@Service
@RequiredArgsConstructor
public class PdfTextExtractorService {

    private final AmazonS3 amazonS3;

    @Value("${aws.s3-bucket}")
    private String bucketName;

    public String extractTextFromS3(String s3Url) throws IOException {
        if (s3Url == null || s3Url.isBlank()) {
            throw new IllegalArgumentException("s3Url must not be null or empty");
        }
        if (bucketName == null || bucketName.isBlank()) {
            throw new IllegalStateException("aws.s3-bucket is not configured");
        }

        String fileName = parseFileNameFromUrl(s3Url);

        S3Object s3Object = amazonS3.getObject(bucketName, fileName);
        try (S3ObjectInputStream s3is = s3Object.getObjectContent();
             PDDocument document = Loader.loadPDF(s3is.readAllBytes())){

            PDFTextStripper stripper = new PDFTextStripper();
            return Objects.toString(stripper.getText(document), "");

        } finally {
            try {
                s3Object.close();
            } catch (Exception ignored) {
            }
        }
    }

    private String parseFileNameFromUrl(String s3Url) {
        String fileName;
        try {
            URL url = new URL(s3Url);
            String path = url.getPath(); // query is not included here
            fileName = Paths.get(path).getFileName().toString();
            if (fileName == null || fileName.isEmpty()) {
                throw new IllegalArgumentException("Could not extract file name from s3Url: " + s3Url);
            }
        } catch (MalformedURLException e) {
            int lastSlash = s3Url.lastIndexOf('/');
            if (lastSlash < 0 || lastSlash == s3Url.length() - 1) {
                throw new IllegalArgumentException("Invalid s3Url: " + s3Url, e);
            }
            fileName = s3Url.substring(lastSlash + 1);
            int qIdx = fileName.indexOf('?');
            if (qIdx >= 0) {
                fileName = fileName.substring(0, qIdx);
            }
            if (fileName.isEmpty()) {
                throw new IllegalArgumentException("Could not extract file name from s3Url: " + s3Url);
            }
        }
        return fileName;
    }
}