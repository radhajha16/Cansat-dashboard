import {
  BatteryCharging90Rounded,
  LocationOn,
  PauseCircleFilledRounded,
  PlaceRounded,
  PlayCircleFilledRounded,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { GoogleMap } from "@react-google-maps/api";
import papaparse from "papaparse";
import React, { useState } from "react";
import Chart from "../components/Chart";
import DADForm from "../components/DADForm";
import WidgetContainer from "../components/WidgetContainer";

import csvFile from "../data/cansat.csv";

const cloneDeep = require("lodash.clonedeep");

const mapStyles = {
  height: "24vh",
  minWidth: "100%",
  borderRadius: 10,
  margin: 0,
  padding: 0,
};

const mapOptions = {
  fullscreenControl: false,
  zoomControl: true,
  zoom: 18,
  minZoom: 4,
  mapTypeControl: false,
  keyboardShortcuts: false,
  streetViewControl: false,
};
const Dashboard = () => {
  const [mapref, setMapRef] = useState(null);
  const [refreshIntervalId, setRefreshIntervalId] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });

  // Chart Data
  const [oriantationData, setOriantationData] = useState({
    labels: ["lable0", "lable1", "lable2", "lable3", "lable4", "lable5"],
    datasets: [
      {
        label: "X-Axis",
        color: "red",
        data: [1, 2, 3, 4, 5, 6],
      },
      {
        label: "Y-Axis",
        color: "green",
        data: [1, 5, 3, 4, 4, 6],
      },
      {
        label: "Z-Axis",
        color: "blue",
        data: [1, 6, 0, 7, 4, 6],
      },
    ],
    xAxisLable: "Time",
    yAxisLable: "Degree",
  });

  const [gyroMagVolData, setGyroMagVolData] = useState({
    labels: [],
    datasets: [
      {
        label: "Gyroscope",
        color: "green",
        data: [],
      },
      {
        label: "Magnetic Field",
        color: "blue",
        data: [],
      },
      {
        label: "Voltage",
        color: "red",
        data: [],
      },
    ],
    xAxisLable: "Time",
    yAxisLable: "Degree",
  });

  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        color: "red",
        data: [],
      },
    ],
    xAxisLable: "Pocket Count",
    yAxisLable: "Temperature",
  });

  const [pressureData, setPressureData] = useState({
    labels: [],
    datasets: [
      {
        label: "Pressure",
        color: "green",
        data: [],
      },
    ],
    xAxisLable: "Pocket Count",
    yAxisLable: "Pressure",
  });

  const [altitudeData, setAltitudeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Altitude",
        color: "blue",
        data: [],
      },
    ],
    xAxisLable: "Pocket Count",
    yAxisLable: "Altitude",
  });

  const [co2Data, setCo2Data] = useState({
    labels: [],
    datasets: [
      {
        label: "CO2",
        color: "red",
        data: [],
      },
    ],
    xAxisLable: "Pocket Count",
    yAxisLable: "CO2",
  });

  const [humidityData, setHumidityData] = useState({
    labels: [],
    datasets: [
      {
        label: "Humidity",
        color: "green",
        data: [],
      },
    ],
    xAxisLable: "Pocket Count",
    yAxisLable: "Humidity",
  });

  const [accelerationData, setAccelerationData] = useState({
    labels: [],
    datasets: [
      {
        label: "Acceleration",
        color: "blue",
        data: [],
      },
    ],
    xAxisLable: "Pocket Count",
    yAxisLable: "Acceleration",
  });

  const [file, setFile] = useState(null);
  const [startReading, setStartReading] = useState(false);

  const handleFileChange = (file) => {
    if (typeof file === "object") {
      setFile(file);
    }
    papaparse.parse(file, {
      header: true,
      skipEmptyLines: true,
      download: true,
      error: (error, file) => {
        console.log("Error while parsing:", error, file);
      },
      complete: function (results) {
        updateStateData(results.data);
      },
    });
  };

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const updateStateData = (data) => {
    const newTempLables = data.map((d, index) => {
      return "lable " + index;
    });

    const newData = data.reduce((r, o) => {
      Object.keys(o).forEach((k) => {
        r[k] = [...(r[k] || []).concat(o[k])];
      });
      return r;
    }, {});

    const tempDataCopy = cloneDeep(temperatureData);
    tempDataCopy.labels = newTempLables;
    tempDataCopy.datasets[0].data = newData["Temperature"];

    const pressureDataCopy = cloneDeep(pressureData);
    pressureDataCopy.labels = newTempLables;
    pressureDataCopy.datasets[0].data = newData["Pressure"];

    const altitudeDataCopy = cloneDeep(altitudeData);
    altitudeDataCopy.labels = newTempLables;
    altitudeDataCopy.datasets[0].data = newData["Altitude"];

    const co2DataCopy = cloneDeep(co2Data);
    co2DataCopy.labels = newTempLables;
    co2DataCopy.datasets[0].data = newData["CO2"];

    const humidityDataCopy = cloneDeep(humidityData);
    humidityDataCopy.labels = newTempLables;
    humidityDataCopy.datasets[0].data = newData["Humidity"];

    const accelerationDataCopy = cloneDeep(accelerationData);
    accelerationDataCopy.labels = newTempLables;
    accelerationDataCopy.datasets[0].data = newData["Acceleration"];

    const gyroMagVolDataCopy = cloneDeep(gyroMagVolData);
    gyroMagVolDataCopy.labels = newTempLables;
    gyroMagVolDataCopy.datasets[0].data = newData["Gyroscope"];
    gyroMagVolDataCopy.datasets[1].data = newData["Magnetic Field"];
    gyroMagVolDataCopy.datasets[2].data = newData["Volatage"];

    setTemperatureData(tempDataCopy);
    setPressureData(pressureDataCopy);
    setAltitudeData(altitudeDataCopy);
    setCo2Data(co2DataCopy);
    setHumidityData(humidityDataCopy);
    setAccelerationData(accelerationDataCopy);
    setGyroMagVolData(gyroMagVolDataCopy);
  };

  const handleStartReading = () => {
    if (startReading) {
      clearInterval(refreshIntervalId);
    } else {
      setRefreshIntervalId(
        setInterval(() => {
          handleFileChange(csvFile);
        }, 3000)
      );
    }
    setStartReading(!startReading);
  };
  return (
    <Paper
      sx={{
        backgroundColor: "#CFF5E7",
        padding: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          <img src="satellite.png" height={45} />
          <Typography variant="h4">Galileo 2022ASI-023</Typography>
        </Stack>

        <Tooltip
          title={`Click here to ${
            startReading ? "stop" : "start"
          } reading file`}
        >
          <Button
            variant="outlined"
            onClick={handleStartReading}
            sx={{
              borderRadius: 10,
            }}
            startIcon={
              startReading ? (
                <PauseCircleFilledRounded />
              ) : (
                <PlayCircleFilledRounded />
              )
            }
            endIcon={
              startReading ? (
                <CircularProgress color="inherit" size={12} />
              ) : null
            }
          >
            {startReading ? "Stop" : "Start"}
          </Button>
        </Tooltip>
        <DADForm file={file} handleFileChange={handleFileChange} />
      </Stack>

      <Grid
        container
        spacing={1}
        sx={{
          p: 1,
        }}
      >
        <Grid item xs={4}>
          <Stack direction="column" spacing={1}>
            <WidgetContainer
              title="GPS Location"
              secondaryChildrens={
                <Chip
                  icon={<PlaceRounded color="error" />}
                  variant="filled"
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle2" component="span">
                        Latitude :
                      </Typography>
                      <Typography variant="caption" component="span">
                        {currentPosition.lat}
                      </Typography>
                      {", "}
                      <Typography variant="subtitle2" component="span">
                        Longitude :
                      </Typography>
                      <Typography variant="caption" component="span">
                        {currentPosition.lng}
                      </Typography>
                    </Stack>
                  }
                />
              }
              body={
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  center={currentPosition}
                  options={mapOptions}
                  onLoad={handleOnLoad}
                >
                  <Tooltip title="Here is your satellite!">
                    <LocationOn
                      sx={{
                        position: "relative",
                        top: "50%",
                        left: "50%",
                        color: "red",
                        cursor: "pointer",
                        marginLeft: "-25px",
                        marginTop: "-50px",
                        height: "50px",
                        width: "50px",
                        zIndex: 1,
                      }}
                    />
                  </Tooltip>
                </GoogleMap>
              }
            />
            <WidgetContainer
              title="body orientation"
              body={
                <Chart
                  labels={oriantationData.labels}
                  datasets={oriantationData.datasets}
                  xAxisLable={oriantationData.xAxisLable}
                  yAxisLable={oriantationData.yAxisLable}
                />
              }
            />
            <WidgetContainer
              title="gyroscope, magnetic field, voltage"
              body={
                <Chart
                  labels={gyroMagVolData.labels}
                  datasets={gyroMagVolData.datasets}
                  xAxisLable={gyroMagVolData.xAxisLable}
                  yAxisLable={gyroMagVolData.yAxisLable}
                />
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <WidgetContainer
            title="payload state: relaunch"
            paperBackgroundColor="rgba(164, 176, 171, 0.5)"
            secondaryChildrens={
              <Chip
                icon={<BatteryCharging90Rounded color="info" />}
                variant="filled"
                label="90%"
              />
            }
            body={
              <Grid container spacing={1}>
                <Grid item xs={6} mt={4}>
                  <Chart
                    labels={temperatureData.labels}
                    datasets={temperatureData.datasets}
                    xAxisLable={temperatureData.xAxisLable}
                    yAxisLable={temperatureData.yAxisLable}
                  />
                </Grid>
                <Grid item xs={6} mt={4}>
                  <Chart
                    labels={pressureData.labels}
                    datasets={pressureData.datasets}
                    xAxisLable={pressureData.xAxisLable}
                    yAxisLable={pressureData.yAxisLable}
                  />
                </Grid>
                <Grid item xs={6} mt={4}>
                  <Chart
                    labels={altitudeData.labels}
                    datasets={altitudeData.datasets}
                    xAxisLable={altitudeData.xAxisLable}
                    yAxisLable={altitudeData.yAxisLable}
                  />
                </Grid>
                <Grid item xs={6} mt={4}>
                  <Chart
                    labels={co2Data.labels}
                    datasets={co2Data.datasets}
                    xAxisLable={co2Data.xAxisLable}
                    yAxisLable={co2Data.yAxisLable}
                  />
                </Grid>
                <Grid item xs={6} mt={4}>
                  <Chart
                    labels={humidityData.labels}
                    datasets={humidityData.datasets}
                    xAxisLable={humidityData.xAxisLable}
                    yAxisLable={humidityData.yAxisLable}
                  />
                </Grid>
                <Grid item xs={6} mt={4}>
                  <Chart
                    labels={accelerationData.labels}
                    datasets={accelerationData.datasets}
                    xAxisLable={accelerationData.xAxisLable}
                    yAxisLable={accelerationData.yAxisLable}
                  />
                </Grid>
              </Grid>
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
