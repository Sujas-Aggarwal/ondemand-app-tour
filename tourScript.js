const ws = new WebSocket("ws://localhost:3000");
const driver = window.driver.js.driver;

ws.onmessage = (event) => {
    console.log("lkuch to aya");
    const data = JSON.parse(event.data);
    console.log(data);
    const driverObj = driver({
        steps: data,
    });

    driverObj.drive();
};
