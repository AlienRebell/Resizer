#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QtNetwork>
#include <QtWidgets>
#include <QPixmap>
#include <QAction>
#include "pictureshowcase.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    pictureshowcase *picture;
private slots:
    void downloadFinished(QNetworkReply*);
    void ondownloadclicked();
    void onsaveclicked();
    void downloadprogress(qint64 done, qint64 max);
    void on_action_Settings_triggered();
    void on_action_Close_triggered();

private:
    void ReadSetings();
    Ui::MainWindow *ui;
    QString savePath;
    QPushButton *downloadButton;
    QPushButton *saveButton;
    QPlainTextEdit *results;
    QPixmap rawpicture;
    QString drivesetting, filetypesetting;
};

#endif // MAINWINDOW_H
