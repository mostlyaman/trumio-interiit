FROM python:3.9-alpine

WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install uvicorn

EXPOSE 8000
CMD [ "uvicorn", "app:main", "--reload" ]
