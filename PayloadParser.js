// Función de parseo del uplink
function parseUplink(device, payload) {
    var payloadb = payload.asBytes();
    env.log(payloadb)

    /*// Verificar que payloadb es un arreglo de bytes
    if (!Array.isArray(payloadb)) {
        env.log("[Error] payloadb no es un arreglo de bytes.");
        return;
    }

    // Usamos env.log para registrar el mensaje completo
    env.log("Payload recibido: " + bytesToHex(payloadb));

    // 1. Location info message (3 bytes)
    var locationInfoMessage = bytesToHex(payloadb.slice(0, 3));
    env.log("Location message: " + locationInfoMessage);

    // 2. Longitud del mensaje (2 bytes)
    var messageLength = bytesToHex(payloadb.slice(3, 5));
    env.log("Message length: " + messageLength);

    // 3. Serial number (2 bytes)
    var serialNo = bytesToHex(payloadb.slice(5, 7));
    env.log("Serial no: " + serialNo);

    // 4. IMEI (8 bytes)
    var imei = bytesToHex(payloadb.slice(7, 15));
    env.log("IMEI: " + imei);

    // 5. GPS data status (1 byte)
    var gpsDataStatus = payloadb[15];
    var gpsStatusMessage = `History data:${(gpsDataStatus & 0x01) === 0 ? 'false' : 'true'}; GNSS data:${(gpsDataStatus & 0x02) === 0 ? 'false' : 'true'}; GNSS working:${(gpsDataStatus & 0x04) === 0 ? 'false' : 'true'}; satellite number:${gpsDataStatus >> 4}`;
    env.log("GPS data status: " + gpsStatusMessage);

    // 6. Alarm (1 byte)
    var alarm = payloadb[16];
    env.log("Alarm code: " + alarm);

    // 7. Fecha y hora (6 bytes)
    var timestamp = parseDate(payload, 17);  // Fecha comienza en el índice 17
    env.log("Datetime: " + timestamp);  // Muestra la fecha formateada
    

    // 8. Altura (4 bytes) - Corregido para obtener el valor flotante adecuado
    var height = hexToFloat(payloadb.slice(23, 27)); // Ajustado para 4 bytes
    env.log("Height: " + height);

    // 9. Longitud (4 bytes) - Corregido para obtener el valor flotante adecuado
    var longitude = hexToFloat(payloadb.slice(27, 31)); // Ajustado para 4 bytes
    env.log("Longitude: " + longitude);

    // 10. Latitud (4 bytes) - Corregido para obtener el valor flotante adecuado
    var latitude = hexToFloat(payloadb.slice(31, 35)); // Ajustado para 4 bytes
    env.log("Latitude: " + latitude);

    // 11. Velocidad (2 bytes)
    var speed = bytesToHex(payloadb.slice(35, 37));
    env.log("Speed(km/h): " + parseInt(speed, 16));

    // 12. Dirección (2 bytes)
    var direction = bytesToHex(payloadb.slice(37, 39));
    env.log("Direction(Degree): " + parseInt(direction, 16));

    // 13. Aceleración en el eje X (2 bytes)
    var accelX = hexToFloat(payloadb.slice(39, 41));
    env.log("Acceleration value axis x: " + accelX);

    // 14. Aceleración en el eje Y (2 bytes)
    var accelY = hexToFloat(payloadb.slice(41, 43));
    env.log("Acceleration value axis y: " + accelY);

    // 15. Aceleración en el eje Z (2 bytes)
    var accelZ = hexToFloat(payloadb.slice(43, 45));
    env.log("Acceleration value axis z: " + accelZ);

    // 16. Voltaje de batería interna (1 byte)
    var batteryVoltage = payloadb[45];
    env.log("Inner battery voltage(percent): " + batteryVoltage + "%");

    // 17. Temperatura del dispositivo (1 byte)
    var deviceTemp = payloadb[46];
    env.log("Device temperature: " + deviceTemp + "℃");

    // 18. Sensor de luz (1 byte)
    var lightSensor = payloadb[47];
    env.log("Light sensor(V): " + (lightSensor === 0xff ? "No front light sensor" : lightSensor));

    // 19. Voltaje de la batería (1 byte)
    var batteryVoltageV = payloadb[48];
    env.log("Battery voltage(V): " + (batteryVoltageV / 10));

    // 20. Voltaje solar (1 byte)
    var solarVoltage = payloadb[49];
    env.log("Solar voltage(V): " + (solarVoltage / 10));

    // 21. Millaje (4 bytes)
    var mileage = bytesToHex(payloadb.slice(50, 54));
    env.log("Mileage(Meter): " + parseInt(mileage, 16));

    // 22. Estado (2 bytes)
    var state = bytesToHex(payloadb.slice(54, 56));
    env.log("State: " + state);

    // 23. Intervalo de subida cuando ACC está encendido (2 bytes)
    var accOnUploadInterval = bytesToHex(payloadb.slice(56, 58));
    env.log("ACC ON Upload Interval (Second): " + parseInt(accOnUploadInterval, 16));

    // 24. Intervalo ACC OFF (4 bytes)
    var accOffInterval = bytesToHex(payloadb.slice(58, 62));
    env.log("ACC OFF Interval (Second): " + parseInt(accOffInterval, 16));

    // 25. Compensación de ángulo (1 byte)
    var angleCompensation = payloadb[62];
    env.log("Angle compensation: " + (angleCompensation === 0 ? "Disabled" : "Enabled"));

    // 26. Compensación de distancia (2 bytes)
    var distanceCompensation = bytesToHex(payloadb.slice(63, 65));
    env.log("Distance compensation: " + (distanceCompensation === "00" ? "Disabled" : "Enabled"));

    // 27. Latido del corazón (1 byte)
    var heartbeat = payloadb[65];
    env.log("Heartbeat (Minute): " + heartbeat);

    // 28. Información del estado de la configuración actual (1 byte)
    var currentSettingStatus1 = payloadb[66];
    env.log("Current Setting Status Information(1): " + currentSettingStatus1);

    // 29. Información del estado de la configuración actual (2 bytes)
    var currentSettingStatus2 = payloadb[67];
    env.log("Current Setting Status Information(2): " + currentSettingStatus2);

    // 30. Soporte de carga inteligente (1 byte)
    var smartUploadSupport = payloadb[68];
    env.log("Smart upload support: " + (smartUploadSupport === 0x80 ? "enable" : "disable"));

    // 31. Puede recargarse (2 bytes)
    var rechargeable = bytesToHex(payloadb.slice(69, 71));
    env.log("Whether it can be rechargeable: " + (rechargeable === "00" ? "Rechargeable device" : "Non-rechargeable"));

    // 32. Tipo de bloqueo (1 byte)
    var lockType = payloadb[71];
    env.log("Lock type(Only support SolarGuardX device): " + (lockType === 0x00 ? "Lock, lock status" : "Unknown"));
}

// Funciones de utilidades para trabajar con los bytes del payload
function bytesToHex(bytes) {
    if (!Array.isArray(bytes)) {
        return "";
    }
    return bytes.map(function(b) {
        return b.toString(16).padStart(2, '0');
    }).join('').toUpperCase();
}

function hexToFloat(bytes) {
    var buffer = new ArrayBuffer(4);
    var dataView = new DataView(buffer);
    dataView.setUint8(0, bytes[0]);
    dataView.setUint8(1, bytes[1]);
    dataView.setUint8(2, bytes[2]);
    dataView.setUint8(3, bytes[3]);

    return dataView.getFloat32(0, true); // Usar formato little-endian
}

// Función para extraer la fecha
function parseDate(payload, index) {
    var year = 2000 + payload[index];   // Año, ajustando para que el año sea 2025 en lugar de 25
    var month = payload[index + 1];     // Mes
    var day = payload[index + 2];       // Día
    var hour = payload[index + 3];      // Hora
    var minute = payload[index + 4];    // Minuto
    var second = payload[index + 5];    // Segundo

    // Devolver la fecha en formato "YYYY MM DD HH:MM:SS"
    return `${year} ${month.toString().padStart(2, '0')} ${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}




// Simulación del objeto `env.log` si no está disponible en tu entorno
if (typeof env === 'undefined') {
    var env = {
        log: function(message) {
            env.log(message); // Fallback a console.log si env.log no está definido
        }
    };*/
}
