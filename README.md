# PC Mission Control

Live CPU, memory, storage and network readings from your computer.

Independent local application, with a holographic interface. Requires Node.js 22 or newer.

## Run

Run `npm install`, then `npm start` and open http://127.0.0.1:8805. On Windows you can also double-click START.cmd after installation. Run `npm test` for automated checks.

## Privacy and operation

This app listens only on loopback and has no cloud deployment or remote-access configuration. Do not expose the port publicly. Source code contains no personal documents or credentials. Browser storage is local to the browser profile and origin (including the port); clearing that storage removes saved data. Back up/export anything important. Browser storage is not application-level encryption.

## Features and limitations

Real CPU time deltas, total/used RAM, project-volume disk free/total, uptime and CPU history. Network throughput uses fixed Windows Get-NetAdapterStatistics queries every four seconds. Other operating systems explicitly report network readings unavailable. No mock data or arbitrary shell execution.
