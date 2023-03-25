# Project Links

[Project Description](https://docs.google.com/document/d/1yukwGR1CTPYJK8iy0meap9maBX5fF9CGUTNoL6ph9vY/edit?usp=sharing)

[Figma Design](https://www.figma.com/file/TkaGAlkZ3gYmDsOUixvMn6/Budgeting-Software-501?node-id=0-1)

# Getting Started
Both the frontend and the backend currently have individual READMEs. Both explain the setup process.

## Terraform
Create a `.env` file in the main directory containing your AWS credentials like we did for the weekly assignments in class. It should look like the following. **<i>Note: If your AWS credentials are globally setup, you won't need to do this.</i>**
```
export AWS_ACCESS_KEY_ID=******
export AWS_SECRET_ACCESS_KEY=********************
```

Run
```
source .env
cd terraform
terraform init
terraform apply
```