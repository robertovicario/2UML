FROM python:3.9

WORKDIR /app

COPY ../app/requirements.txt /app/requirements.txt
COPY ../app /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 7860

CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
