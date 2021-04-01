# echo Name of ActualTotalLoad file to be imported:
# read file1
# echo Name of Day Ahead Total Load Forecast file to be imported:
# read file1
# echo Name of Aggregated Generation Per Type file to be imported:
# read file1

sudo cp ~/Downloads/ActualTotalLoad-10days.csv ~/TL19-62/back-end/RESTapi
sudo cp ~/Downloads/AggregatedGenerationPerType-10days.csv ~/TL19-62/back-end/RESTapi
sudo cp ~/Downloads/DayAheadTotalLoadForecast-10days.csv ~/TL19-62/back-end/RESTapi

echo All files moved successfully! Running RestAPI tests:

cd ~/TL19-62/back-end/RESTapi

npm test 

echo Testing is Done! Server is ready to be set up.

node app         
