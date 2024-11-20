from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from huggingface_hub import InferenceClient

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")
app.mount("/data", StaticFiles(directory="data"), name="data")

@app.get("/", response_class=HTMLResponse)
def html():
    with open("index.html") as page:
        return page.read()

@app.post("/prompt")
async def prompt(request: Request):
    data = await request.json()
    prompt = data.get("prompt")

    try:
        client = InferenceClient("mistralai/Mixtral-8x7B-Instruct-v0.1")
        messages = [
            {"role": "system", "content": "You are a friendly Chatbot."},
            {"role": "user", "content": prompt}
        ]
        response = client.chat_completion(
            messages,
            max_tokens=512,
            temperature=0.7,
            top_p=0.95
        )
        result = response['choices'][0]['message']['content']
        
        return JSONResponse(content={"prompt": result})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
