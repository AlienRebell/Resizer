#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "settings.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    saveButton = ui->saveButton;
    downloadButton = ui->downloadButton;
    drivesetting = "web";
    filetypesetting = "JPG";
    results = ui->plainTextEdit;
    connect(saveButton, &QPushButton::clicked, this, &MainWindow::onsaveclicked);
    connect(downloadButton, &QPushButton::clicked, this, &MainWindow::ondownloadclicked);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::ondownloadclicked()
{
        ReadSetings();
        results->clear();
        if(drivesetting == "web")
        {
            QNetworkAccessManager *manager = new QNetworkAccessManager(this);
            const QUrl url = QUrl(ui->urlLine->text());
            QNetworkRequest request(url);
            QNetworkReply *reply = manager->get(request);
            connect(manager, &QNetworkAccessManager::finished, this, &MainWindow::downloadFinished);
            connect(reply, &QNetworkReply::downloadProgress, this, &MainWindow::downloadprogress);
            results->appendPlainText(tr("Getting file from %1").arg(ui->urlLine->text()));
        }
        else
        {
            QString filePath = QFileDialog::getOpenFileName(this,"Get image file to work out");
            ui->urlLine->setText(filePath);
            results->appendPlainText(tr("Getting file from %1").arg(ui->urlLine->text()));
            picture = new pictureshowcase;
            rawpicture.load(filePath);
            picture->setPicture(rawpicture);
            picture->show();
        }
}

void MainWindow::onsaveclicked()
{
        savePath = QFileDialog::getSaveFileName(this,"Choose directory to save file");
        QFile file(savePath+"."+filetypesetting);
        ui->saveLine->setText(savePath);
        file.open(QIODevice::ReadWrite);
        rawpicture = rawpicture.scaledToWidth(picture->getWidth());
        rawpicture = rawpicture.scaledToHeight(picture->getHeight());
        QByteArray arr = filetypesetting.toLocal8Bit();
        char *filetype = arr.data();
        rawpicture.save(&file, filetype);
        results->appendPlainText(tr("Saving file on %1").arg(savePath+"."+filetypesetting));
        file.close();

}
void MainWindow::downloadFinished(QNetworkReply *reply)
{
    if(!reply->error())
    {
        rawpicture.loadFromData(reply->readAll());
        results->appendPlainText(tr("Download from %1 is complete").arg(ui->urlLine->text()));
        picture = new pictureshowcase;
        picture->setPicture(rawpicture);
        picture->show();
    }
    else {
        results->appendPlainText(reply->header(QNetworkRequest::ContentTypeHeader).toString());
        results->appendPlainText(reply->header(QNetworkRequest::LastModifiedHeader).toDateTime().toString());
        results->appendPlainText(QString::number(reply->header(QNetworkRequest::ContentLengthHeader).toULongLong()));
        results->appendPlainText(QString::number(reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt()));
        results->appendPlainText(reply->attribute(QNetworkRequest::HttpReasonPhraseAttribute).toString());
    }
}
void MainWindow::downloadprogress(qint64 done, qint64 max)
{
    results->appendPlainText(tr("Downloaded %1 bytes out of %2").arg(done).arg(max));
}

void MainWindow::on_action_Settings_triggered()
{
   Settings *settings = new Settings();
   settings->show();
}

void MainWindow::on_action_Close_triggered()
{
    this->close();
}
void MainWindow::ReadSetings()
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
        drivesetting = oldsettings[1];
        filetypesetting = oldsettings[0];

    }
    else {
        QMessageBox report;
        report.setText("Settings file cannot be open");
        report.exec();
    }
}
