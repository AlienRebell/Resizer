#include "settings.h"
#include "ui_settings.h"
#include <QFile>
#include <QTextStream>

Settings::Settings(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Settings)
{

    ui->setupUi(this);
    this->setWindowTitle("Settings");
    ok = ui->Ok;
    cancel = ui->Cancel;
    standard = ui->Default;
    connect(ok, &QPushButton::clicked, this, &Settings::saveAndClose);
    connect(cancel, &QPushButton::clicked, this, &Settings::close);
    connect(standard, &QPushButton::clicked, this, &Settings::Default);
    oldvalues = getOldValues();
}

Settings::~Settings()
{
    delete ui;
}
void Settings::close()
{
    this->done(1);
}
void Settings::saveAndClose()
{
    QString localefilepath = "C:/Users/user/Documents/Qt/Project137/Settings.txt";
    QFile file(localefilepath);
    if(file.open(QIODevice::WriteOnly))
    {
        QTextStream stream(&file);
        stream << filetype <<endl;
        stream << sourcetype << endl;
        file.close();
        QMessageBox report;
        report.setText("Values are saved");
        report.exec();
    }
    else {
        QMessageBox report;
        report.setText("Settings file cannot be open");
        report.exec();
    }
    this->done(1);
}
void Settings::Default()
{
    QString defaultFiletype, defaultSourceType;
    QString localefilepath = "C:/Users/user/Documents/Qt/Project137/Settings.txt";
    defaultFiletype = "JPG";
    defaultSourceType = "web";
    QFile file(localefilepath);
    if(file.open(QIODevice::WriteOnly))
    {
        QTextStream stream(&file);
        stream << defaultFiletype <<endl;
        stream << defaultSourceType << endl;
        file.close();
        QMessageBox report;
        report.setText("Values are set to default");
        report.exec();
    }
    else {
        QMessageBox report;
        report.setText("Settings file cannot be open");
        report.exec();
    }
}
void Settings::on_GIF_clicked()
{
    filetype = "GIF";
}

void Settings::on_PNG_clicked()
{
    filetype = "PNG";
}

void Settings::on_JPG_clicked()
{
    filetype = "JPG";
}

void Settings::on_computer_clicked()
{
    sourcetype = "computer";
}

void Settings::on_web_clicked()
{
    sourcetype = "web";
}
QList<QString> Settings::getOldValues()
{
    QList<QString> oldsettings;
    QString localefilepath = "C:/Users/user/Documents/Qt/Project137/Settings.txt";
    QString holder;
    QFile file(localefilepath);
    if(file.open(QIODevice::ReadOnly))
    {
        QTextStream stream(&file);
        while(!stream.atEnd())
        {
            holder = stream.readLine();
            oldsettings.push_back(holder);
        }
    }
    else {
        QMessageBox report;
        report.setText("Settings file cannot be open");
        report.exec();
    }
    return oldsettings;
}
