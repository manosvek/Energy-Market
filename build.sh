spin()
{
  spinner="/|\\-/|\\-"
  while :
  do
    for i in `seq 0 7`
    do
      echo -n "${spinner:$i:1}"
      echo -en "\010"
      sleep 0.2
    done
  done
}

# setup cli
echo "Setting up CLI"
cd ./cli-client/energy_group062

spin &
SPIN_PID=$!


npm install axios --save &>/dev/null 
npm link &>/dev/null


# setup front-end
echo "Setting up Front-End"
cd ../../front-end/

npm install react --save &>/dev/null

#run api
echo "Setting up REST-API"
cd ../back-end/RESTapi
npm install mysql cors jsonwebtoken --save &>/dev/null

kill -9 $SPIN_PID
node app 
