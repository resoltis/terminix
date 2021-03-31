Terminix AWS Service Generator

Created By:
    Jared Waller
    Reagan Soltis
    Austin Porter
    Matt Weikel
    Connor Templin
    Andrew Zea

-------------------Table of Contents----------------------------------
    1. Introduction
    2. Adding New Services
        a. Adding Front-End Forms
        b. Adding Yaml Service Templates
----------------------------------------------------------------------

                            Introduction
    This code will create a web portal that will automatically generate
(1) Cloud Tranformation Yaml File and (1) Parameter JSON File. These
files will be uploaded to the Azure DevOps repository for further use
by the Terminix Team. We have specifically designed the code to be
easily expandable for Terminix. Adding new services will take minimal
time.

----------------------------------------------------------------------

                        Adding New Services

Adding Front-End Forms
    1. Create an HTML form with appropriate parameters for the service.
    2. Make sure the HTML form is encased in a body tag.
    3 .Add the HTML form to "UA-Capstone-2021\express"
    4. Add the form as an option to the drop down list populated in the
        jQuery code in "UA-Capstone-2021\express\index.html:122"
    5. Add the form to the switch statement to be loaded in on change in
        "UA-Capstone-2021\express\index.html:139"
    6. Complete.

Adding Yaml Service Templates
    1. Create a Yaml template with appropriate parameters for the service.
    2. Add the template to "UA-Capstone-2021\YmlTemplates"
    3. Add the service to the if-else statement in 
        "UA-Capstone-2021\server.js:382"
    4. Complete.


