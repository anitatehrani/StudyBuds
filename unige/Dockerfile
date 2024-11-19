FROM python:3.12-alpine
COPY --from=ghcr.io/astral-sh/uv:0.5.2 /uv /uvx /bin/
# Copy the project into the image
WORKDIR /app
ADD pyproject.toml uv.lock ./

# Sync the project into a new environment, using the frozen lockfile
RUN uv sync --frozen
ADD main.py ./

ENTRYPOINT ["uv", "run"]
CMD ["fastapi","dev","--host=0.0.0.0","main.py"]
