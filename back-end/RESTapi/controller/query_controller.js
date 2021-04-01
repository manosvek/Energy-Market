var handler = require('./quota_handler');

const sql1a = "SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day,  DateTime as DateTimeUTC, TotalLoadValue as ActualTotalLoadValue, UpdateTime as UpdateTimeUTC  FROM ActualTotalLoad as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Day = ? and Month = ? and Year = ? ORDER BY DateTime;";
const sql1b = "SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day,  sum(TotalLoadValue) as ActualTotalLoadByDayValue FROM ActualTotalLoad as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Month = ? and Year = ? GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Day ORDER BY Day;";
const sql1c = "SELECT 'entso-e' as Source, 'ActualTotalLoad' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month,  sum(TotalLoadValue) as ActualTotalLoadByMonthValue FROM ActualTotalLoad as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Year = ? GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Month ORDER BY Month;";

const sql2a = "SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day ,  DateTime as DateTimeUTC, Pr.ProductionTypeText as ProductionType, ActualGenerationOutput as ActualGenerationOutputValue, UpdateTime as UpdateTimeUTC FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and Pr.ProductionTypeText = ? and R.ResolutionCodeText = ? and Day = ? and Month = ? and Year = ? ORDER BY DateTime, ProductionType";
const sql2b = "SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day , Pr.ProductionTypeText as ProductionType, sum(ActualGenerationOutput) as ActualGenerationOutputByDayValue FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and Pr.ProductionTypeText = ? and R.ResolutionCodeText = ? and Month = ? and Year = ? GROUP BY AreaTypeCodeText, MapCodeText, ResolutionCodeText, Day, ProductionTypeText ORDER BY Day, ProductionType";
const sql2c = "SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month, Pr.ProductionTypeText as ProductionType, sum(ActualGenerationOutput) as ActualGenerationOutputByMonthValue FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and Pr.ProductionTypeText = ? and R.ResolutionCodeText = ? and Year = ? GROUP BY AreaTypeCodeText, MapCodeText, ResolutionCodeText, Month, ProductionTypeText ORDER BY Month, ProductionType";
const sql2aAllTypes = "SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day ,  DateTime as DateTimeUTC, Pr.ProductionTypeText as ProductionType, ActualGenerationOutput as ActualGenerationOutputValue, UpdateTime as UpdateTimeUTC FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Day = ? and Month = ? and Year = ? ORDER BY DateTime, ProductionType;";
const sql2bAllTypes = "SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day , Pr.ProductionTypeText as ProductionType, sum(ActualGenerationOutput) as ActualGenerationOutputByDayValue FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Month = ? and Year = ? GROUP BY AreaTypeCodeText, MapCodeText, ResolutionCodeText, Day, ProductionTypeText ORDER BY Day, ProductionType";
const sql2cAllTypes = "SELECT 'entso-e' as Source, 'AggregatedGenerationPerType' as Dataset, AreaName, AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month, Pr.ProductionTypeText as ProductionType, sum(ActualGenerationOutput) as ActualGenerationOutputByMonthValue FROM AggregatedGenerationPerType as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R, ProductionType as Pr WHERE Pr.Id = ATL.ProductionTypeId and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Year = ? GROUP BY AreaTypeCodeText, MapCodeText, ResolutionCodeText, Month, ProductionTypeText ORDER BY Month, ProductionType";

const sql3a = "SELECT 'entso-e' as Source, 'DayAheadTotalLoadForecast' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day,  DateTime as DateTimeUTC, TotalLoadValue as DayAheadTotalLoadForecastValue, UpdateTime as UpdateTimeUTC  FROM DayAheadTotalLoadForecast as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Day = ? and Month = ? and Year = ? ORDER BY DateTime;";
const sql3b = "SELECT 'entso-e' as Source, 'DayAheadTotalLoadForecast' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month , Day,  sum(TotalLoadValue) as DayAheadTotalLoadForecastByDayValue FROM ActualTotalLoad as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Month = ? and Year = ? GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Day ORDER BY Day;";
const sql3c = "SELECT 'entso-e' as Source, 'DayAheadTotalLoadForecast' as Dataset, AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, Year, Month,  sum(TotalLoadValue) as DayAheadTotalLoadForecastByMonthValue FROM DayAheadTotalLoadForecast as ATL, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and AreaName = ? and R.ResolutionCodeText = ? and Year = ? GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Month ORDER BY Month;";

const sql4a = "SELECT 'entso-e' as Source, 'ActualVSForecastedTotalLoad' as Dataset, ATL.AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, ATL.Year, ATL.Month , ATL.Day,  ATL.DateTime as DateTimeUTC, ATL.TotalLoadValue as DayAheadTotalLoadForecastValue, Act.TotalLoadValue as ActualTotalLoadValue FROM DayAheadTotalLoadForecast as ATL, ActualTotalLoad as Act, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE ATL.AreaName = Act.AreaName and ATL.Year = Act.Year and ATL.Month = Act.Month and ATL.Day = Act.Day and ATL.DateTime = Act.DateTime and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and R.Id = Act.ResolutionCodeId and M.Id = Act.MapCodeId and A.Id = Act.AreaTypeCodeId and ATL.AreaName = ? and R.ResolutionCodeText = ? and ATL.Day = ? and ATL.Month = ? and ATL.Year = ? ORDER BY ATL.DateTime;";
const sql4b = "SELECT 'entso-e' as Source, 'ActualVSForecastedTotalLoad' as Dataset, ATL.AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, ATL.Year, ATL.Month , ATL.Day,  sum(ATL.TotalLoadValue) as DayAheadTotalLoadForecastByDayValue, sum(Act.TotalLoadValue) as ActualTotalLoadByDayValue FROM DayAheadTotalLoadForecast as ATL, ActualTotalLoad as Act, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE ATL.AreaName = Act.AreaName and ATL.Year = Act.Year and ATL.Month = Act.Month and ATL.Day = Act.Day and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and R.Id = Act.ResolutionCodeId and M.Id = Act.MapCodeId and A.Id = Act.AreaTypeCodeId and ATL.AreaName = ? and R.ResolutionCodeText = ? and ATL.Month = ? and ATL.Year = ? GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Day ORDER BY Day;";
const sql4c = "SELECT 'entso-e' as Source, 'ActualVSForecastedTotalLoad' as Dataset, ATL.AreaName, A.AreaTypeCodeText as AreaTypeCode, M.MapCodeText as MapCode, R.ResolutionCodeText as ResolutionCode, ATL.Year, ATL.Month, sum(ATL.TotalLoadValue) as DayAheadTotalLoadForecastByMonthValue, sum(Act.TotalLoadValue) as ActualTotalLoadByMonthValue FROM DayAheadTotalLoadForecast as ATL, ActualTotalLoad as Act, MapCode as M, AreaTypeCode as A, ResolutionCode as R WHERE ATL.AreaName = Act.AreaName and ATL.Year = Act.Year and ATL.Month = Act.Month and R.Id = ATL.ResolutionCodeId and M.Id = ATL.MapCodeId and A.Id = ATL.AreaTypeCodeId and R.Id = Act.ResolutionCodeId and M.Id = Act.MapCodeId and A.Id = Act.AreaTypeCodeId and ATL.AreaName = ? and R.ResolutionCodeText = ? and ATL.Year = ? GROUP BY MapCodeText, ResolutionCodeText, AreaTypeCodeText, Month ORDER BY Month;";

//1a -- Total Actual Load Query
var oneA = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.DD, req.params.MM, req.params.YYYY];
  conn.query(sql1a, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

//1b -- Total Actual Load Query (Month)
var oneB = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.MM, req.params.YYYY];
  conn.query(sql1b, data, (err, results) => {
    handler(conn, req, res, err,results);
  });
};

//1c -- Total Actual Load Query
var oneC = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.YYYY];
  conn.query(sql1c, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

//2a -- Aggregated Generation Per Type
var twoA = (conn, req, res) => {
  let data = [req.params.AreaName,req.params.ProductionType, req.params.Resolution, req.params.DD, req.params.MM, req.params.YYYY];
  let dataAllTypes = [req.params.AreaName, req.params.Resolution, req.params.DD, req.params.MM, req.params.YYYY];
  if(req.params.ProductionType == "AllTypes"){
    conn.query(sql2aAllTypes, dataAllTypes, (err, results) => {
      handler(conn, req, res, err, results);
    });
  }
  else{
    conn.query(sql2a, data, (err, results) => {
      handler(conn, req, res, err, results);
    });
  }
};

//2b -- Aggregated Generation Per Type (Month)
var twoB = (conn, req, res) => {
  let data = [req.params.AreaName,req.params.ProductionType, req.params.Resolution, req.params.MM, req.params.YYYY];
  let dataAllTypes = [req.params.AreaName, req.params.Resolution, req.params.MM, req.params.YYYY];
  if(req.params.ProductionType == "AllTypes"){
    conn.query(sql2bAllTypes, dataAllTypes, (err, results) => {
      handler(conn, req, res, err, results);
    });
  }
  else{
    conn.query(sql2b, data, (err, results) => {
      handler(conn, req, res, err, results);
    });
  }
};

//2c -- Aggregated Generation Per Type (Year)
var twoC = (conn, req, res) => {
  let data = [req.params.AreaName,req.params.ProductionType, req.params.Resolution, req.params.YYYY];
  let dataAllTypes = [req.params.AreaName, req.params.Resolution, req.params.YYYY];
  if(req.params.ProductionType == "AllTypes"){
    conn.query(sql2cAllTypes, dataAllTypes, (err, results) => {
      handler(conn, req, res, err, results);
    });
  }
  else{
    conn.query(sql2c, data, (err, results) => {
      handler(conn, req, res, err, results);
    });
  }
};

//3a -- Day Ahead Total Load Forecast
var threeA = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.DD, req.params.MM, req.params.YYYY];
  conn.query(sql3a, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

//3b -- Day Ahead Total Load Forecast (Month)
var threeB = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.MM, req.params.YYYY];
  conn.query(sql3b, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

//3c -- Day Ahead Total Load Forecast (Year)
var threeC = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.YYYY];
  conn.query(sql3c, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

//4a -- ActualvsForecast
var fourA = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.DD, req.params.MM, req.params.YYYY];
  conn.query(sql4a, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

//4b -- ActualvsForecast (Month)
var fourB = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.MM, req.params.YYYY];
  conn.query(sql4b, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

//4c -- ActualvsForecast (Year)
var fourC = (conn, req, res) => {
  let data = [req.params.AreaName, req.params.Resolution, req.params.YYYY];
  conn.query(sql4c, data, (err, results) => {
    handler(conn, req, res, err, results);
  });
};

module.exports = {oneA, oneB, oneC, twoA, twoB, twoC, threeA, threeB, threeC, fourA, fourB, fourC}