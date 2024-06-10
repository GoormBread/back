FROM node:21


WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
# Helm 설치를 위한 환경 설정
ENV HELM_VERSION=3.14.1
ENV HELM_BASE_URL="https://get.helm.sh"
ENV HELM_TAR_FILE="helm-v${HELM_VERSION}-linux-amd64.tar.gz"

# Helm 설치
RUN curl -L ${HELM_BASE_URL}/${HELM_TAR_FILE} | tar -xzO linux-amd64/helm > /usr/local/bin/helm && \
    chmod +x /usr/local/bin/helm && \
    helm version

COPY . .

CMD ["sh", "-c", "npx prisma migrate dev && npx prisma generate && npm run start:dev"]

EXPOSE 3000