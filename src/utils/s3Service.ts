import * as AWS from 'aws-sdk';
import { ResponseModel } from '../models/DTOs/responseModel';

export class S3Service {
    private static bucketName: string = "test-newstein-portal-bucket";

    public static async upload(req, res) {
        try {
            let s3bucket = new AWS.S3({
                accessKeyId: "AKIA23MYR4RA2A5KUAGP",
                secretAccessKey: "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",
                apiVersion: '2006-03-01'
            });

            let file = req.files.file;

            console.log(req.files.file.name)
            var params = {
                Key: file.name,
                Body: file.data,
                ACL: 'public-read',
                Bucket: S3Service.bucketName
            };

            s3bucket.putObject(params).promise().then(data => {
                console.log('Successfully uploaded data ', data);

                return res.status(200).send(ResponseModel.getValidResponse(S3Service.buildUploadedFileUrl(file.name)));
            }, error => {
                console.error(error, error.stack);
                return res.status(200).send(ResponseModel.getInvalidResponse(["Something went wrong"]));
            })



        } catch (err) {
            console.log('ERROR MSG: ', err);
            return res.status(500).send(err);
        }
    }

    private static buildUploadedFileUrl(fileName: string): string {
        return `https://test-newstein-portal-bucket.s3.us-east-2.amazonaws.com/${fileName}`;
    }
}