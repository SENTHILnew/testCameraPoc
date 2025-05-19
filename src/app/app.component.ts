import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LOAD_WASM, NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { WebcamModule } from 'ngx-webcam';

LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgxScannerQrcodeComponent, WebcamModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('action') scannerComponent!: NgxScannerQrcodeComponent;

  title = 'camera-poc';

  showBarcodeScan = false;

  showCam = false

  resultText = '';

  constructor(private readonly ref: ChangeDetectorRef) {

  }

  openQrCodeScanner() {
    this.showBarcodeScan = true;
    this.ref.detectChanges();

    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      this.scannerComponent.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    this.scannerComponent?.start(playDeviceFacingBack).subscribe(
    );
  }

  closBarCodeScan() {
    this.showBarcodeScan = false;
    this.scannerComponent?.stop();
  }

  onEvent(event: ScannerQRCodeResult[]) {
    this.resultText = event[0].value
    this.closBarCodeScan();
  }
}
