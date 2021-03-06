# Connecting and making changes to electron

Before being able to make changes to electron on the raspberry pi you'll have to download filezilla from here:

[https://filezilla-project.org/](https://filezilla-project.org/) 

Open up Filezilla and fill in the necessary login information:



*   Host: ip of the raspberry pi, can be found using ifconfig
*   Username: pi
*   Password: raspberry
*   Port: 22

After connecting you should see a screen similar to this:
![](https://i.imgur.com/hdS8GZC.png)


In this menu there is one folder named smartmirror. Here you can drop your new files or upload your edited files.
After uploading the files you can reboot the pi to check if everything works correct. 

If the smartmirror folder is not yet made download the source from gitlab, download all the node packages and copy everything to the new made folder.

* Navigation changes

For more information about making changes in the navigation, check the [Navigation documentation](Navigation in electron)

* Facial recognition information

For more information about making changes or checking how facial recognition works, check the [Facial recognition in electron documentation](Facial recognition in electron)

* Adding keybindings

To add more keybindings and see how these works, check the [Keybindings in electron documentation](Keybindings in electron)

* Temperature sensor

To check how the temperature sensor script works, check the [Temperature and humidity sensor documentation](Temperature and humidity sensor)

* Speech recognition

For more information on the speech recognition, check the [Speech recognition documentation](speech recognition) and the [Speech installation guide](speech installation guide)

* Express

For more information on the express api calls, check the [Express documentation](Express)