import logging

from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

logger = logging.getLogger("be4breach")


def register_exception_handlers(app) -> None:
    @app.exception_handler(HTTPException)
    async def http_exception_handler(
        request: Request,
        exc: HTTPException
    ) -> JSONResponse:
        logger.warning(
            "http_exception path=%s status_code=%s",
            request.url.path,
            exc.status_code
        )
        return JSONResponse(
            status_code=exc.status_code,
            content={"error": "http_exception", "detail": exc.detail}
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError
    ) -> JSONResponse:
        logger.warning(
            "validation_error path=%s",
            request.url.path
        )
        return JSONResponse(
            status_code=422,
            content={"error": "validation_error", "detail": exc.errors()}
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(
        request: Request,
        exc: Exception
    ) -> JSONResponse:
        logger.exception(
            "unhandled_exception path=%s",
            request.url.path
        )
        return JSONResponse(
            status_code=500,
            content={
                "error": "internal_server_error",
                "detail": "Internal Server Error"
            }
        )
