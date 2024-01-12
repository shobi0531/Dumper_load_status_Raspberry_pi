import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Color> co = [Colors.grey, Colors.red, Colors.yellow, Colors.green];
  String ipAddress = '';
  String receivedMessage = '';
  String data = '';
  late Socket socket;

  @override
  Widget build(BuildContext context) {
    // Set the color of the CircleAvatar dir 2ectly based on receivedMessage
    Color circleColor = co[0]; // Default color
    if (receivedMessage != null && receivedMessage.trim().toLowerCase() == 'empty') {
      circleColor = co[1];
    } else if (receivedMessage != null && receivedMessage.trim().toLowerCase() == 'unloaded') {
      circleColor = co[2];
    } else if (receivedMessage != null && receivedMessage.trim().toLowerCase() == 'loaded') {
      circleColor = co[3];
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('QR Code Scanner'),
      ),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () {
              scanQRCode();
            },
            style: ElevatedButton.styleFrom(
              primary: Colors.deepOrange,
            ),
            child: Text(
              'SCAN',
              style: TextStyle(
                color: Colors.white,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(30.0),
            child: Text(
              "Ithu than ip   " + ipAddress,
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(30.0),
            child: Text(
              "Client Message " + receivedMessage,
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(30.0),
            child: CircleAvatar(
              backgroundColor: circleColor,
            ),
          ),
        ],
      ),
    );
  }

  void scanQRCode() async {
    try {
      final qrCode = await FlutterBarcodeScanner.scanBarcode(
        '#ff6666',
        'Cancel',
        true,
        ScanMode.QR,
      );
      if (!mounted) return;

      setState(() {
        ipAddress = qrCode;
      });

      print('QRCode_Result:--');
      print(qrCode);

      // Connect to the server after scanning the QR code
      connectToServer();
    } on PlatformException {
      ipAddress = "Failed to scan QR Code";
    }
  }

  void connectToServer() {
    Socket.connect("192.168.43.112", 5555).then((Socket newSocket) {
      setState(() {
        socket = newSocket;
      });

      print('Connected to server');

      // Listen for data from the server
      socket.listen(
            (List<int> data) {
          receivedMessage = utf8.decode(data);
          print('Received from server: $receivedMessage');

          // Update UI when a message is received
          setState(() {});
        },
        onDone: () {
          print('Server disconnected');
          socket.destroy();
        },
        onError: (error) {
          print('Error: $error');
          socket.destroy();
        },
      );
    }).catchError((error) {
      print('Error: $error');
    });
  }

  @override
  void dispose() {
    if (socket != null) {
      socket.destroy();
    }
    super.dispose();
  }
}