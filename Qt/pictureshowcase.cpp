#include "pictureshowcase.h"
#include "ui_pictureshowcase.h"
#include <QDebug>

pictureshowcase::pictureshowcase(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::pictureshowcase)
{
    ui->setupUi(this);
    this->setWindowTitle("Resize your picture");
    width = ui->width;
    height = ui->height;
    width->setRange(0,4096);
    height->setRange(0, 4096);
    proceed = ui->pushButton;
    apply = ui->pushButton_2;
    picturelabel = ui->pictureLabel;
    picturelabel->setGeometry(250,1,0,0);
    pictureh = 0;
    picturew = 0;
    connect(proceed, &QPushButton::clicked, this, &pictureshowcase::on_pushButton_clicked);
    connect(apply, &QPushButton::clicked, this, &pictureshowcase::on_pushButton_2_clicked);
}

pictureshowcase::~pictureshowcase()
{
    delete ui;
}
void pictureshowcase::setPicture(QPixmap picture)
{
    mpicture = picture;
}

void pictureshowcase::paintEvent(QPaintEvent *event)
{
    QPainter painter(this);
    if(pictureh == 0 && picturew == 0)
    {
        int height = mpicture.height();
        int width = mpicture.width();
        picturelabel->setPixmap(mpicture);
        picturelabel->setFixedSize(width, height);
        this->setFixedSize(width+250, height);
    }
    else {
        if(pictureh == 0 && picturew == 0)
        {
            pictureh = mpicture.height();
            picturew = mpicture.width();
        }
        mpicture = mpicture.scaled(picturew, pictureh, Qt::KeepAspectRatio);
        picturelabel->setPixmap(mpicture);
        picturelabel->setFixedSize(picturew, pictureh);
        this->setFixedSize(picturew + 250, pictureh);
    }

}

void pictureshowcase::on_pushButton_clicked()
{
    pictureh = height->value();
    picturew = width->value();
    this->update();
}
int pictureshowcase::getWidth()
{
    if(width->value() != 0)
    {
       return  width->value();
    }
    else
    {
        return mpicture.width();
    }

}
int pictureshowcase::getHeight()
{
    if(height->value() != 0)
    {
        return  mpicture.height();
    }
    else {
        return mpicture.height();
    }
}


void pictureshowcase::on_pushButton_2_clicked()
{
    this->done(1);
}
