#ifndef PICTURESHOWCASE_H
#define PICTURESHOWCASE_H

#include <QDialog>
#include <QObject>
#include <QWidget>
#include <QtWidgets>

namespace Ui {
class pictureshowcase;
}

class pictureshowcase : public QDialog
{
    Q_OBJECT
public:
    explicit pictureshowcase(QWidget *parent = nullptr);
    ~pictureshowcase();
    QPixmap mpicture;
    void setPicture(QPixmap);
    void paintEvent(QPaintEvent *event);
    int getWidth();
    int getHeight();
private:
    int pictureh, picturew;
    QPushButton *proceed, *apply;
    QSpinBox *height;
    QSpinBox *width;
    QLabel *picturelabel;


private slots:
    void on_pushButton_clicked();
    void on_pushButton_2_clicked();

private:
    Ui::pictureshowcase *ui;
};

#endif // PICTURESHOWCASE_H
