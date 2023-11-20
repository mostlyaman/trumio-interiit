# Trumio AI Application Backend
#### built using FASTAPI and langchain

## Development Instructions

1. Create a virtual enviroment.
```sh
virtualenv env --python=3.9
source ./env/Scripts/activate
```

2. Install Python Dependencies
```sh
pip install -r requirements.txt
```

3. Update secrets in .env file.

4. Run the web server.
```sh
uvicorn app:main --reload
``` 

