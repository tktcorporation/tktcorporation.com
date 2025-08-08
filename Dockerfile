FROM node:20.8.1-bullseye-slim

EXPOSE 5173

ENV LC_ALL=C.UTF-8

RUN apt-get update && \
  apt-get install -y \
  apt-utils \
  curl \
  jq \
  git \
  sudo

RUN npm install -g npm@9 @antfu/ni

ENV UNAME=docker
ENV GID=1000
ENV UID=1001

RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -G sudo -o -s /bin/bash $UNAME
RUN echo "$UNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create app directory and set ownership
RUN mkdir -p /app && chown -R $UNAME:$UNAME /app

USER $UNAME
