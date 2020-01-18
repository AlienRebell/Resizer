#ifndef SETTINGS_H
#define SETTINGS_H

#include <QDialog>
#include <QtWidgets>
#include <QList>

namespace Ui {
class Settings;
}

class Settings : public QDialog
{
    Q_OBJECT

public:
    explicit Settings(QWidget *parent = nullptr);
    ~Settings();
private:
    QList<QString>oldvalues;
    QList<QString>newvalues;
    QString filetype, sourcetype;
    QPushButton *standard, *ok, *cancel;
    QList<QString> getOldValues();
private slots:
    void Default();
    void saveAndClose();
    void close();
    void on_GIF_clicked();

    void on_PNG_clicked();

    void on_JPG_clicked();

    void on_computer_clicked();

    void on_web_clicked();

private:
    Ui::Settings *ui;
};

#endif // SETTINGS_H
