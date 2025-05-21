#!/bin/bash

start() {
    printer "🚀 Starting the app"
    docker run --rm --name app-2uml -p 7860:7860 app-2uml
    handler
}

stop() {
    printer "🛑 Stopping the app"
    docker stop app-2uml
    handler
}

setup() {
    printer "🔨 Setting up the app"

    # -------------------------

    git submodule update --init --recursive

    # -------------------------

    docker build -t app-2uml .
    docker run --rm --name app-2uml -p 7860:7860 app-2uml

    # -------------------------

    handler
}

build() {
    printer "🔧 Building the app"

    # -------------------------

    mkdir -p build
    rm -rf build/*
    cp -r app build/app
    rm -f build/app/README.md
    cp .gitattributes build
    cp .gitignore build
    cp Dockerfile build
    cp app/README.md build

    # -------------------------

    handler
}

clear() {
    printer "🧹 Clearing all"
    docker rm -f app-2uml
    docker rmi app-2uml
    handler
}

deploy() {
    printer "📦 Deploying the app"

    # -------------------------

    rm -rf 2UML/*
    cp -r app 2UML/app
    cp .gitattributes 2UML
    cp .gitignore 2UML
    cp Dockerfile 2UML
    cp app/README.md 2UML

    # -------------------------

    cd 2UML
    git checkout main
    git add .
    git commit -m "Deployed the app"
    git push
    cd ..

    # -------------------------

    git checkout main
    git submodule update --remote
    git add .
    git commit -m "Deployed the app"
    git push

    # -------------------------
    
    handler
}

printer() {
    echo ""
    echo $1
    echo ""
}

handler() {
    if [ $? -eq 0 ]; then
        printer "✅ Process completed successfully"
    else
        printer "❌ An error occurred during the process"
        exit 1
    fi
}

case $1 in
    start)
        start
        ;;
    stop)
        stop
        ;;
    setup)
        setup
        ;;
    build)
        build
        ;;
    clear)
        clear
        ;;
    deploy)
        deploy
        ;;
    *)
        echo "Usage: $0 {start|stop|setup|build|clear|deploy}"
        ;;
esac
