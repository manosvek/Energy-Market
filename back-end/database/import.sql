-- SHOW VARIABLES LIKE 'sql_mode'
-- SELECT @@GLOBAL.sql_mode;
SET GLOBAL sql_mode = 'ONLY_FULL_GROUP_BY,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET GLOBAL local_infile = 1;
-- SHOW VARIABLES LIKE 'local_infile'

LOAD DATA INFILE '/var/lib/mysql-files/MapCode.csv' 
INTO TABLE MapCode
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/ResolutionCode.csv' 
INTO TABLE ResolutionCode
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/ProductionType.csv' 
INTO TABLE ProductionType
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/AreaTypeCode.csv' 
INTO TABLE AreaTypeCode
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/AllocatedEICDetail.csv' 
INTO TABLE AllocatedEICDetail
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/ActualTotalLoad-10days.csv' 
INTO TABLE ActualTotalLoad
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/AggregatedGenerationPerType-10days.csv' 
INTO TABLE AggregatedGenerationPerType
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/DayAheadTotalLoadForecast-10days.csv' 
INTO TABLE 
DayAheadTotalLoadForecast
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
ESCAPED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
