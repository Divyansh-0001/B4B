import os

import uvicorn


def main() -> None:
    uvicorn_kwargs = {"host": "0.0.0.0"}
    port = os.getenv("PORT")
    if port:
        uvicorn_kwargs["port"] = int(port)
    uvicorn.run("app.main:app", **uvicorn_kwargs)


if __name__ == "__main__":
    main()
