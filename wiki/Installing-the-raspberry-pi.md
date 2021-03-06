# Installation guide for the Smart Mirror


## About this document

With this document you can step for step install the raspberry pi with electron, opencv and other important libraries. There is a field "Extra" for the installation of python3.7, this is not needed anymore since we are using python3.5M.
You can paste each command in to a raspbian commandline to install everything needed.


## Installation for raspberry

First install the Raspbian Stretch Lite image from the official raspbian page here:

[https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/) 

After installing this onto the sd card of the pi, setup the basic settings for the pi.

Type `sudo raspi-config`

Login to a network at `2 Network Options`

After that, configure `3 Boot Options` to auto login to the command line as Pi.

If you have 

As last go to `5 Interfacing Options` and select SSH, after that press enter on Yes.

Then close the config menu and reboot. After the reboot use the command `sudo apt-get update` & `sudo apt-get upgrade` to update the raspberry pi. To check the ip to connect using SSH use `ifconfig`


### Connect to the pi

Connect to the raspberry pi using it's ip & Putty. Connect your laptop to the same network as the pi was connected to. On the pi type the command `ifconfig` to get the ip. Use this ip in Putty to connect.


### Installing a desktop (xorg)

Because raspbian stretch lite doesn't come with a desktop, and you need something to show the application on, you'll have to download our desktop. To install a desktop use xorg. The following commands are needed to install a desktop:


```
sudo apt-get install xorg
```


To test if xorg work you can use this command:


```
startx
```


If the command works you can also add an auto start script. Enter the following command:


```
sudo nano ~/.xinitrc
```


than add these lines to that file:


```
cd smartmirror/
exec npm start > ../.log.txt
```



### NPM & Electron

To run electron NPM is required. Enter this code into the console to install NPM:


```
cd /tmp
wget https://nodejs.org/dist/v8.2.1/node-v8.2.1-linux-armv7l.tar.xz
tar xfv node-v8.2.1-linux-armv7l.tar.xz
cd node-v8.2.1-linux-armv7l
sudo cp -R * /usr/local/
```


After that's done NodeJS & NPM are installed. Use the following command to install Electron:


```
sudo npm install -g electron --unsafe-perm=true --allow-root
```


This is not everything. You also need a few libraries to run electron. Copy the code below and run it to install the needed libraries.


```
sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev curl \
                       gperf bison python-dbusmock
```


Connect to the raspberry pi using filezilla on port 22. Now drag the project folder into the root of the raspberry pi.

_Source: [https://blog.marekkraus.sk/linux/how-to-make-electron-run-on-raspberry-pi/](https://blog.marekkraus.sk/linux/how-to-make-electron-run-on-raspberry-pi/) _


### Fixing GLIBC_2.27

The moment you will try to start electron now you'll get an error that GLibC_2.27 is not up to date. To fix this change 'stretch' to 'buster' in** /etc/apt/sources.list **on line 1.

 \
After you have done this, run this command:


```
sudo apt-get update
sudo apt-get install libc6
```


When libc buster is installed, change back 'buster' to 'stretch' in **/etc/apt/sources.list **on line 1. Than `sudo apt-get update` to enable stretch again.


### Pip

Instal pip for python 3.5m by using this command:


```
sudo apt-get install python3-pip
```



### OpenCV (precompiled)

OpenCV can be compiled, but takes a really long time to do and can get allot of errors. That's why it's best to install the precompiled openCV library. To do this make a directory to download the precompiled opencv library to.


```
mkdir tools
cd tools
```


Download the correct precompiled opencv library using

[https://www.piwheels.org/simple/opencv-python/](https://www.piwheels.org/simple/opencv-python/) **HIER GEBLEVEN**


```
sudo wget 
```


Before being able to install this library you'll have to get 'wheel' using


```
pip install wheel
```


Install this precompiled library using


```
pip install https://www.piwheels.org/simple/opencv-python/opencv_python-3.4.4.19-cp35-cp35m-linux_armv7l.whl#sha256=329d9d9fdd62b93d44a485aeaab4602c6f5b8555ea8bcc7dbcdc62c90cfe2c3f
```


Install the following libraries to make opencv run on the raspberry pi.


```
sudo apt-get install libopencv-dev
sudo apt install libqt4-test
sudo apt-get install libatlas3-base
sudo apt-get install libgtk2.0-dev
sudo apt-get install libwebp6
sudo apt-get install libjasper-dev
sudo apt-get install libqtgui4
sudo apt-get install libilmbase-dev
sudo apt-get install libopenexr-dev
sudo apt-get install libgstreamer1.0-dev
```



### Dlib


#### Dlib - own compilation

To install dlib you'll have to run the commands here below to install the necessary packages:


```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential \
    cmake \
    gfortran \
    git \
    wget \
    curl \
    graphicsmagick \
    libgraphicsmagick1-dev \
    libatlas-dev \
    libavcodec-dev \
    libavformat-dev \
    libboost-all-dev \
    libgtk2.0-dev \
    libjpeg-dev \
    liblapack-dev \
    libswscale-dev \
    pkg-config \
    python3-dev \
    python3-numpy \
    python3-pip \
    zip
sudo apt-get clean
```


After this is done you'll have to compile dlib. But to compile you'll need to have a bigger swapfile. Change this in **/etc/dphys-swapfile**.

than change** CONF_SWAPSIZE=100 **to **CONF_SWAPSIZE=1024** and save. \


Then run this command to update the new value: \



```
sudo /etc/init.d/dphys-swapfile restart
```


To download and install dlib V19.6 run this code:


```
mkdir -p dlib
git clone -b 'v19.6' --single-branch https://github.com/davisking/dlib.git dlib/
cd ./dlib
sudo python setup.py install --compiler-flags "-mfpu=neon"
```


 \
Change back **/etc/dphys-swapfile** to** CONF_SWAPSIZE=1024 **to **CONF_SWAPSIZE=100** and save. \


Then run this command again to update the new value: \



```
sudo /etc/init.d/dphys-swapfile restart
```


_Source: [https://www.pyimagesearch.com/2018/01/22/install-dlib-easy-complete-guide/](https://www.pyimagesearch.com/2018/01/22/install-dlib-easy-complete-guide/) _


#### Dlib precompiled

Because dlib takes a long time to compile I also included a link to a precompiled dlib for python 3.5. Because we are using python 3.5 to get opencv working this should install way faster.

Make a folder to install dlib


```
mkdir tools
cd tools
```


Download the correct precompiled dlib library using


```
sudo wget https://www.piwheels.org/simple/dlib/dlib-19.9.0-cp35-cp35m-linux_armv7l.whl#sha256=e5d97fe32c4536748e1d637258cfe3d0d7f9ae318b42c4a4598def5758ba460d
```


Before being able to install this library you'll have to get 'wheel' using


```
pip3 install wheel
```


Install this precompiled library using


```
pip3 install dlib-19.9.0-cp35-cp35m-linux_armv7l.whl
```


_Source: [https://www.quora.com/How-do-I-install-the-dlib-Python-package-in-Raspberry-Pi](https://www.quora.com/How-do-I-install-the-dlib-Python-package-in-Raspberry-Pi) _


### 


### Facial recognition

To install **face_recognition**:


```
sudo pip install face_recognition
```



### Run on startup

After installing all the libraries and packages you want to enable the auto run function on the pi. Enter the following command to edit the startup script:


```
cd ~
sudo nano .bashrc
```


add this line of code at the end of the file


```
startx -- -nocursor
```


Before rebooting make sure you 


## Extra


### Installation for python 3.7

_This step is not needed because raspbian comes with python 3.5, which we'll be using for opencv and other libraries._

To install Python 3.7 you have to download a few libraries to compile it ourselfs.

In putty paste this code and hit enter:


```
sudo apt-get install -y build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev libffi-dev
```


After this is done, copy and paste this code and hit enter:


```
wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tar.xz
tar xf Python-3.7.0.tar.xz
cd Python-3.7.0
./configure --prefix=/usr/local/opt/python-3.7.0
make -j 4
```


This will compile python 3.7 and might take a little while. Then you'll have to install python 3.7 using this command:


```
sudo make altinstall
```


Make Python 3.7 the default version using these commands and removing the tarball:


```
sudo ln -s /usr/local/opt/python-3.7.0/bin/pydoc3.7 /usr/bin/pydoc
sudo ln -s /usr/local/opt/python-3.7.0/bin/python3.7 /usr/bin/python
sudo ln -s /usr/local/opt/python-3.7.0/bin/python3.7m /usr/bin/python3.7m
sudo ln -s /usr/local/opt/python-3.7.0/bin/pyvenv-3.7 /usr/bin/pyvenv
sudo ln -s /usr/local/opt/python-3.7.0/bin/pip3.7 /usr/bin/pip
alias python='/usr/bin/python3.7'
alias python3='/usr/bin/python3.7'
ls /usr/bin/python*
cd ..
sudo rm -r Python-3.7.0
rm Python-3.7.0.tar.xz
. ~/.bashrc
```


Verify that Python 3.7 is correctly installed using this command:


```
python -V
```
