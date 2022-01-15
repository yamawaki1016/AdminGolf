#!/bin/sh

aws s3 rm s3://higashi-golf-admin/ --recursive
aws s3 cp dist s3://higashi-golf-admin/ --recursive