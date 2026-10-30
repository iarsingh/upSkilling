# Linux disk resize

Use this page when a host needs a larger filesystem. The reboot rule depends on which volume you change.

## Data volumes

A data volume, such as the disk mounted at /var/lib/data, can be resized online. Grow the disk in the cloud console, then grow the partition and the filesystem without stopping the service. No reboot is required for a data volume. Stay on this section when the mount is not the root filesystem.

## Boot volume

The boot volume, mounted at /, cannot be resized online. After you grow the disk, schedule a reboot so the guest picks up the new size, then grow the partition and the filesystem. Tell the service owner the host will restart. Do not claim that every volume avoids a reboot. The data-volume rule does not apply to the boot volume.
