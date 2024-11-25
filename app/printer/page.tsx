"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Br, Cut, Line, Printer, Row, Text, render } from "react-thermal-printer";

export default function Page() {
  const receipt = (
    <Printer type="epson" width={58} characterSet="korea" debug={true}>
      <Text size={{ width: 2, height: 2 }}>Rp 50.000</Text>
      <Text bold={true}>Pembayaran Sukses</Text>
      <Br />
      <Line />
      <Row left="Metode Pembayaran" right="Tunai" />
      <Row left="Nomor Referensi" right="1234567890" />
      <Row left="Jumlah Pembayaran" right="Rp 50.000" />
      <Row left="Pajak" right="Rp 5.000" />
      <Row left="Total Bersih" right="Rp 45.000" />
      <Line />
      <Row left={<Text bold={true}>Layanan Cuci Kering X 2</Text>} right="Rp 40.000" />
      <Text> Berat: 5kg / Pewangi: Lavender</Text>
      <Row left="Diskon (-)" right="- Rp 5.000" />
      <Br />
      <Line />
      <Row left={<Text bold={true}>Total</Text>} right={<Text underline="1dot-thick">Rp 50.000</Text>} />
      <Line />
      <Row left="Pemilik" right="Bapak Laundry" />
      <Row left="Nomor NPWP" right="00.000.000.0-000.000" />
      <Row left="Kontak" right="0812-3456-7890" />
      <Row left="Alamat" right="Jalan Bersih No. 123, Kota Laundry" />
      <Line />
      <Br />
      <Text align="center">Wifi: laundry-wifi / PW: cuci123</Text>
      <Cut />
    </Printer>
  );

  const [port, setPort] = useState<SerialPort>();
  const { mutateAsync: print, isPending: isPrinting } = useMutation({
    mutationFn: async () => {
      let _port = port;
      if (_port == null) {
        _port = await navigator.serial.requestPort();
        await _port.open({ baudRate: 9600 });
        setPort(_port);
      }

      const writer = _port.writable?.getWriter();
      if (writer != null) {
        const data = await render(receipt);

        await writer.write(data);
        writer.releaseLock();
      }
    },
  });

  return (
    <main>
      {/* <div>{receipt}</div> */}
      <div style={{ marginTop: 24 }}>
        <Button type="button" disabled={isPrinting} onClick={() => print()}>
          {isPrinting ? "Loading..." : "Print"}
        </Button>
      </div>
    </main>
  );
}
