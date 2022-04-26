# Interrupt sequence
trap cleanupexit INT

function cleanup() {
    rm workspace/*
    rm site/assets/images/qrcode.svg
    echo "[ ] Cleared workspace"
}

function cleanupexit() {
    cleanup
    exit
}

# Setup
cleanup

# Run NPM project
npm run devStart &

# Main loop
while :
do
    echo "[ ] Waiting for new URL"

    while :
    do
        # Check for file in workspace directory
        [[ $(ls workspace) ]] && echo "[ ] New URL detected" && break
        sleep 0.5
    done
    
    SHORTURL=$(cat workspace/short-url.txt)
    FULLURL=$(cat workspace/full-url.txt)

    # Generate QR code
    qrcode -o site/assets/images/qrcode.svg https://mchs.link/${SHORTURL} &

    cp template.html workspace
    sed -i s\#\(FULLURL\)\#"${FULLURL}"\#g workspace/template.html
    mv workspace/template.html site/${SHORTURL}.html
    
    cleanup

done