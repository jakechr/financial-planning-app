// create an s3 bucket named financial-app-501r that has public access and enables static website hosting

resource "aws_s3_bucket" "hosting_bucket" {
  bucket = "financial-app-501r"

}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.hosting_bucket.id
  acl    = "public-read"
}


resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.hosting_bucket.id
  index_document {
    suffix = "index.html"
  }

}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.hosting_bucket.id
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "PublicReadGetObject",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "s3:GetObject",
          "Resource" : "arn:aws:s3:::financial-app-501r/*"
        }
      ]
  })
}
