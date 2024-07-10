const driver = window.driver.js.driver;

const startTour = (data) => {
    const driverObj = driver({
        steps: data,
    });

    driverObj.drive();
};
 