-- 1---------------------------------------------
SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day ,  DateTime as DateTimeUTC, TotalLoadValue as ActualTotalLoadValue, UpdateTime as UpdateTimeUTC
FROM ActualTotalLoad as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Day = 10 and Month = 1 and Year = 2018
ORDER BY DateTime;

SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day,  sum(TotalLoadValue) as ActualTotalLoadByDayValue
FROM ActualTotalLoad as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Month = 1 and Year = 2018
GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Day
ORDER BY Day;


SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month, sum(TotalLoadValue) as ActualTotalLoadByMonthValue
FROM ActualTotalLoad as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Year = 2018
GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Month
ORDER BY Month;

-- 2--------------------------------------------
SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day ,  DateTime as DateTimeUTC, Pr.ProductionTypeText as ProductionType, ActualGenerationOutput as ActualGenerationOutputValue, UpdateTime as UpdateTimeUTC 
FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr 
WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Day = 9 and Month = 1 and Year = 2018
ORDER BY DateTime, ProductionType;


SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day , Pr.ProductionTypeText as ProductionType, sum(ActualGenerationOutput) as ActualGenerationOutputByDayValue
FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr 
WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Month = 1 and Year = 2018
GROUP BY AreaTypeCodeText, MapCodeText, ResolutionCodeText, Day, ProductionTypeText
ORDER BY Day, ProductionType;


SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month, Pr.ProductionTypeText as ProductionType, sum(ActualGenerationOutput) as ActualGenerationOutputByMonthValue
FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr 
WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Year = 2018
GROUP BY AreaTypeCodeText, MapCodeText, ResolutionCodeText, Month, ProductionTypeText
ORDER BY Month, ProductionType;

-- 3------------------------------------------
SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day ,  DateTime as DateTimeUTC, TotalLoadValue as DayAheadTotalLoadForecastValue, UpdateTime as UpdateTimeUTC
FROM DayAheadTotalLoadForecast as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Day = 10 and Month = 1 and Year = 2018
ORDER BY DateTime;

SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day,  sum(TotalLoadValue) as DayAheadTotalLoadForecastByDayValue
FROM DayAheadTotalLoadForecast as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Month = 1 and Year = 2018
GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Day
ORDER BY Day;


SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month, sum(TotalLoadValue) as DayAheadTotalLoadForecastByMonthValue
FROM DayAheadTotalLoadForecast as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and Year = 2018
GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Month
ORDER BY Month;

-- 4-----------------------------------------
SELECT 'entso-e' as Source, 'ActualVSForecastedTotalLoad' as Dataset, ATL.AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, ATL.Year, ATL.Month , ATL.Day,  ATL.DateTime as DateTimeUTC, ATL.TotalLoadValue as DayAheadTotalLoadForecastValue, Act.TotalLoadValue as ActualTotalLoadValue
FROM DayAheadTotalLoadForecast as ATL, ActualTotalLoad as Act, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE ATL.AreaName = Act.AreaName and ATL.Year = Act.Year and ATL.Month = Act.Month and ATL.Day = Act.Day and ATL.DateTime = Act.DateTime and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and R.Id = Act.ResolutionCodeId and M.Id = Act.MapCodeId and A.Id = Act.AreaTypeCodeId and ATL.AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and ATL.Day = 3 and ATL.Month = 1 and ATL.Year = 2018
ORDER BY ATL.DateTime;
 

SELECT 'entso-e' as Source, 'ActualVSForecastedTotalLoad' as Dataset, ATL.AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, ATL.Year, ATL.Month , ATL.Day,  sum(ATL.TotalLoadValue) as DayAheadTotalLoadForecastByDayValue, sum(Act.TotalLoadValue) as ActualTotalLoadByDayValue
FROM DayAheadTotalLoadForecast as ATL, ActualTotalLoad as Act, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE ATL.AreaName = Act.AreaName and ATL.Year = Act.Year and ATL.Month = Act.Month and ATL.Day = Act.Day and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and R.Id = Act.ResolutionCodeId and M.Id = Act.MapCodeId and A.Id = Act.AreaTypeCodeId and ATL.AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and ATL.Month = 1 and ATL.Year = 2018
GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Day
ORDER BY Day;


SELECT 'entso-e' as Source, 'ActualVSForecastedTotalLoad' as Dataset, ATL.AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, ATL.Year, ATL.Month, sum(ATL.TotalLoadValue) as DayAheadTotalLoadForecastByMonthValue, sum(Act.TotalLoadValue) as ActualTotalLoadByMonthValue
FROM DayAheadTotalLoadForecast as ATL, ActualTotalLoad as Act, MapCode as M, AreaTypeCode as A, ResolutionCode as R 
WHERE ATL.AreaName = Act.AreaName and ATL.Year = Act.Year and ATL.Month = Act.Month and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and R.Id = Act.ResolutionCodeId and M.Id = Act.MapCodeId and A.Id = Act.AreaTypeCodeId and ATL.AreaName = 'Greece' and R.ResolutionCodeText = 'PT60M' and ATL.Year = 2018
GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Month
ORDER BY Month;

--Login ------------------------------------------
SELECT Username, Password, Quotas, Email FROM Users WHERE Username = 'admin'

--Logout -----------------------------------------
SELECT * FROM Users;
SELECT COUNT(*) as count FROM Users WHERE Username = 'admin' and status = 1
SELECT COUNT(*) as count, Quotas FROM Users WHERE Username = 'admin' and status = 0