#!/bin/bash

start() {
    printer "🚀 Starting the app"
    docker-compose up
    handler
}

stop() {
    printer "🛑 Stopping the app"
    docker-compose down
    handler
}

setup() {
    printer "🔨 Setting up the app"
    docker-compose up --build
    handler
}

clear() {
    printer "🧹 Clearing all"
    docker-compose down --volumes --rmi all
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
        start $@
        ;;
    stop)
        stop
        ;;
    setup)
        setup $@
        ;;
    clear)
        clear
        ;;
    *)
        echo "Usage: $0 {start|stop|setup|clear}"
        ;;
esac
