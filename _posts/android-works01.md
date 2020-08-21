---
title: android课设-蓝牙助手
tags:
  - Android
categories:
  - Android
abbrlink: 37370
date: 2018-12-13 20:41:19
---
课设制作思路非常简单，就是制作一个蓝牙助手
<!--more-->
# Bluetooth status helper课程设计
## 设计缘由
众所周知目前安卓机器都可以很简单的获取蓝牙状态。但是由于一些原因我所使用的HTC U Ultra在更新到了Android Oreo以后失去了查看蓝牙状态的功能。因此在本设计中打算借助外部方式实现这个功能
## 初步分析
由于在使用Shizuku Manager时以及使用Brevent时发现可以通过扩展开发的方式调用部分系统API，这些API在一定程度上根据厂商的设计方式不同会无法直接调用或是被屏蔽掉。但是HTC在安卓5.0时代已经在系统中大量（完全）保留了原生Android的API，因此只要需要寻找这些接口的调用方式即可使用“被屏蔽”的功能。
在手机实际使用过程中发现缺失的功能如下：

+ 更改蓝牙可被发现状态
+ 更改蓝牙可被发现状态的时长
+ (可选)查看的蓝牙列表

## 编写过程
### 蓝牙权限的获取

蓝牙权限的获取应该是整个项目最核心的部分。只有实现了能够检测蓝牙开启状态并请求蓝牙权限其余功能才能使用。
在阅读[官方文档](https://developer.android.com/guide/topics/connectivity/bluetooth)时发现，在Android Oreo中，想要获取蓝牙权限，应该由四个权限组成：
即两个位置权限，两个蓝牙权限。即：

``` xml
<!--AndroidManifest.xml-->
<!-- 添加蓝牙权限-开始 -->
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" /><!--蓝牙权限-->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /><!--Android位置权限>
<!--蓝牙权限添加-结束-->
```

> 由于安卓新的安全机制，获取硬件的控制权限一般是视为危险行为（获取的权限为关键权限），因此需要动态调用权限申请以及权限的注册。

### 初始化蓝牙权限

这一段直接上代码：

```java
setTitle("蓝牙助手");
        {
            if (savedInstanceState == null ){
                bltAdapter = ((BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE)).getAdapter();

                //查看设备是否支持蓝牙功能
                if (bltAdapter != null ){

                    //查看蓝牙是否开启
                    if (bltAdapter.isEnabled()){
                        //若已经开启蓝牙则弹出一个提示已经开启
                        String notification = "蓝牙已经开启";
                        additional_inform="蓝牙开启";
                        information=logcat(information,additional_inform);
                        Toast.makeText(MainActivity.this,notification,Toast.LENGTH_SHORT).show();
                    }else   {
                        //若未开启则弹出一个窗口请求开启权限
                        Intent enablebtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                        startActivityForResult(enablebtIntent, Constants.REQUEST_ENABLE_BT);
                    }
                }else {
                    //当设备不支持蓝牙功能的时候点击按钮退出程序
                    AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                    builder.setTitle("注意");
                    builder.setMessage("您的设备很可能不支持蓝牙功能");
                    builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            finish();
                        }
                    });
                    builder.show();
                }
            }

        }
```

关键点解释：

1. 传感器一般是通过相应的Adapter来获取使用权，因此先注册BluetoothAdapter，并且方式为getAdapter()，获取系统的BluetoothService；
1. 判断是否开启了蓝牙，如果未开启立即申请权限；

### 重写OnActivityResult()

```java
@Override
    protected void onActivityResult(int requestCode, int resultCode,Intent data){
        super.onActivityResult(requestCode,resultCode, data);
        switch (requestCode){
            case Constants.REQUEST_ENABLE_BT:
                if (resultCode == RESULT_OK){
                    additional_inform="蓝牙开启";
                    information=logcat(information,additional_inform);
                    AlertDialog.Builder builder_welcome = new AlertDialog.Builder(MainActivity.this);
                    builder_welcome.setTitle("");
                    builder_welcome.setMessage("感谢使用蓝牙助手！\n 这款工具面向部分ROM没有提供查看蓝牙状态功能的机型\n 如：HTC，LG\n 如果您的手机ROM拥有类似功能，您仍可尝试使用。");
                    builder_welcome.setPositiveButton("我知道了", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {}
                    });
                    builder_welcome.show();
                    Toast.makeText(MainActivity.this,"蓝牙已开启",Toast.LENGTH_SHORT).show();

                }else {
                    Toast.makeText(MainActivity.this,"蓝牙助手需要蓝牙权限才可以正常运行",Toast.LENGTH_SHORT).show();
                    finish();
                }
                default:super.onActivityResult(requestCode,resultCode,data);
        }

    }
```

这么写或者说这么改写的主要原因是蓝牙部分相当于使用了一个新的activity进行控制。

#### 与之匹配的contants.java

```java
public class Constants {
    public static final int REQUEST_ENABLE_BT = 1;
}
```

这一段主要还是根据重写的onActivityResult()设定默认的request Code。

###  部分功能模块编写

#### 蓝牙开关

```java
mswitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked){
                    Intent enablebtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                    startActivityForResult(enablebtIntent, Constants.REQUEST_ENABLE_BT);
                    Toast.makeText(MainActivity.this,"蓝牙开启",Toast.LENGTH_SHORT).show();
                    additional_inform="蓝牙开启";
                    information=logcat(information,additional_inform);
                } else {
                    bltAdapter.disable();
                    Toast.makeText(MainActivity.this,"蓝牙关闭",Toast.LENGTH_SHORT).show();
                    additional_inform="蓝牙关闭";
                    information=logcat(information,additional_inform);
                }
            }
        });
```

#### 日志查看

##### 模块主代码

```java
goTO_log.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent log = new Intent(MainActivity.this,log_watcher.class);
                Bundle bundle = new Bundle();
                bundle.putString("information",information);
                bundle.putString("time",time);
                log.putExtra("bundle",bundle);
                startActivity(log);
            }
        });
```

##### 查看Activity部分代码

```java
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class log_watcher extends AppCompatActivity {
    
    TextView log;
    TextView log_time;
    Button btn;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_watcher);{
            setTitle("LOG");
            Bundle bundle = getIntent().getBundleExtra("bundle");
            final String[] information = {bundle.getString("information")};
            final String[] time = {bundle.getString("time")};


            log = (TextView) this.findViewById(R.id.logcat);
            log_time = (TextView) this.findViewById(R.id.logcat_time);
            btn = (Button) this.findViewById(R.id.log_clean);

            btn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    time[0]="\0";
                    information[0] ="\0";

                    log.setText("\0");
                    log_time.setText("\0");
                    Toast.makeText(log_watcher.this,"日志已清除",Toast.LENGTH_SHORT).show();
                }
            });



            log.setText(information[0]);
            log_time.setText(time[0]);


        }

    }
}
```

##### 传递log

```java
private String logcat(String information, String additional_inform){
        information=information+additional_inform+'\n';
        additional_inform="\0";
        //log.setText(information);
        get_log_time();
        return information;
    }

    private String get_log_time(){
        SimpleDateFormat sdf=new SimpleDateFormat("HH:mm:ss");
        java.util.Date date=new java.util.Date();
        time=time+"\n"+sdf.format(date);
        //log_time.setText(time+"\n");
        return time;
    }
```

#### 设定可被发现时间

如果认真研究过蓝牙的文档的话，不难发现蓝牙默认最长可被发现时间为300秒，并且在高版本Android上不能使用旧方法进行时间的延展，另外输入值的“null”以及“0”最终获取值并不相同，因此具体代码如下：

```java
cs_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String _timeout = editText.getText().toString();

                if(TextUtils.isEmpty(editText.getText()) ){//判断输入是否为空

                    Intent dis_intent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
                    dis_intent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 300);
                    startActivity(dis_intent);
                    Toast.makeText(MainActivity.this,"设备参照默认最大时间:300秒设置可被发现",Toast.LENGTH_LONG).show();
                    additional_inform="设备可被发现，时间"+timeout+"秒";
                    information=logcat(information,additional_inform);

                } else {
                    timeout =Integer.parseInt(_timeout);
                    //若输入值不为空，采用安卓本身方法进行广播
                    if (timeout <= 300 && timeout != 0){

                        Intent dis_intent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
                        dis_intent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, timeout);
                        startActivity(dis_intent);
                        Toast.makeText(MainActivity.this,"设备目前已经可被发现，时间为"+timeout+"秒",Toast.LENGTH_LONG).show();
                        additional_inform="设备可被发现，时间"+timeout+"秒";
                        information=logcat(information,additional_inform);

                    } if (timeout > 300){
                        //若时间长于300秒，采用反射方式调用系统蓝牙可被发现的开关以达到延时目的
                        setDiscoverableTimeout(timeout);
                        Toast.makeText(MainActivity.this,"设备目前已经可被发现，时间为"+timeout+"秒",Toast.LENGTH_LONG).show();
                        additional_inform="设备可被发现，时间"+timeout+"秒";
                        information=logcat(information,additional_inform);

                    } if (timeout == 0){
                        Intent dis_intent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
                        dis_intent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 120);
                        startActivity(dis_intent);
                        timeout=120;
                        Toast.makeText(MainActivity.this,"输入值为0。设备目前已经可被发现，默认时间为"+timeout+"秒",Toast.LENGTH_LONG).show();
                        additional_inform="设备可被发现，时间"+timeout+"秒";
                        information=logcat(information,additional_inform);
                    }
                }
            }
        });
```

##### 时间高于300秒时方法重写

```java
public void setDiscoverableTimeout(int timeout) {
    BluetoothAdapter adapter=BluetoothAdapter.getDefaultAdapter();
    try {
        Method setDiscoverableTimeout = BluetoothAdapter.class.getMethod("setDiscoverableTimeout", int.class);
        setDiscoverableTimeout.setAccessible(true);
        Method setScanMode =BluetoothAdapter.class.getMethod("setScanMode", int.class,int.class);
        setScanMode.setAccessible(true);
        setDiscoverableTimeout.invoke(adapter, timeout);
        setScanMode.invoke(adapter, BluetoothAdapter.SCAN_MODE_CONNECTABLE_DISCOVERABLE,timeout);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

> 另外一定要注意：一定要抛异常，否则编译时会报错

#### 蓝牙扫描

另外说起蓝牙，应该难点就是在广播及扫描部分，但是由于本人理解并不深刻因此可能会出现问题。

````java
 scan_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (bltAdapter.isEnabled()){
                    bltAdapter.enable();
                }

                if (bltAdapter.isDiscovering()) {
                    bltAdapter.cancelDiscovery();
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {//利用睡眠阻隔系统重启扫描服务，并处理异常
                        e.printStackTrace();
                    }
                    bltAdapter.startDiscovery();
                }else{
                    bltAdapter.startDiscovery();
                }
                Toast.makeText(MainActivity.this,"正在进行扫描...",Toast.LENGTH_SHORT).show();

                Intent intent = new Intent(bltAdapter.ACTION_REQUEST_ENABLE);
                startActivity(intent);
                //扫描到了任一蓝牙设备
                if(BluetoothDevice.ACTION_FOUND.equals(intent.getAction()))
                {
                    Log.v(TAG, "### BT BluetoothDevice.ACTION_FOUND ##");
                    BluetoothDevice btDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                    if(btDevice != null){

                        Log.v(TAG , "Name : " + btDevice.getName() + " Address: " + btDevice.getAddress());
                        Toast.makeText(MainActivity.this,"Name:"+btDevice.getName()+"Address:"+btDevice.getAddress(),Toast.LENGTH_LONG).show();

                    }
                    else if(BluetoothDevice.ACTION_BOND_STATE_CHANGED.equals(intent.getAction()))
                    {
                        Log.v(TAG, "### BT ACTION_BOND_STATE_CHANGED ##");
                        int cur_bond_state = intent.getIntExtra(BluetoothDevice.EXTRA_BOND_STATE, BluetoothDevice.BOND_NONE);
                        int previous_bond_state = intent.getIntExtra(BluetoothDevice.EXTRA_PREVIOUS_BOND_STATE, BluetoothDevice.BOND_NONE);
                        Log.v(TAG, "### cur_bond_state ##" + cur_bond_state + " ~~ previous_bond_state" + previous_bond_state);
                    }
                }


                additional_inform="设备进行扫描";
                information=logcat(information,additional_inform);
            }
        });
````

#### 取消扫描

```java
 mCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (bltAdapter.isDiscovering()) {
                    bltAdapter.cancelDiscovery();
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {//利用睡眠阻隔系统重启扫描服务，并处理异常
                        e.printStackTrace();
                    }
                }
                Toast.makeText(MainActivity.this,"已取消",Toast.LENGTH_SHORT).show();
            }
        });
```

#### 双击返回键退出

这一段也是对返回键的执行进行重写：

```java
@Override
    public void onBackPressed() {
        long secondTime = System.currentTimeMillis();
        if (secondTime - firstTime > 2000) {
            Toast.makeText(MainActivity.this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
            firstTime = secondTime;
        } else{
            finish();
        }
    }
```

至于其他部分比如关于，非常简单没必要来说。

### RES部分

这部分最具有说服力应该只有这一段代码，方法是在res部分新建style.xml：

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    android:shape="rectangle">
    <solid android:color="#3dafeb"/>
    <corners android:radius="150dp"/>
    <stroke android:width="5dp" android:dashWidth="5dp" android:color="#77d5cf"/>
    <stroke android:width="10dp" android:color="#84ebe5"/>
</shape>
```

### 顺便附上主activity的layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:accessibilityHeading="true"
    android:minHeight="142dp"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/changeStatus"
        android:layout_width="138dp"
        android:layout_height="51dp"
        android:layout_marginStart="15dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="148dp"
        android:background="@drawable/round_botton_2"
        android:text="change status"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.484"
        app:layout_constraintStart_toStartOf="parent" />

    <Switch
        android:id="@+id/_switch"
        android:layout_width="309dp"
        android:layout_height="38dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="44dp"
        android:layout_marginEnd="2dp"
        android:checked="true"
        android:showText="false"
        android:text="蓝牙"
        android:textOff="蓝牙关闭"
        android:textOn="蓝牙开启"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:checked="true" />

    <Button
        android:id="@+id/_scan"
        style="?android:attr/buttonStyle"
        android:layout_width="159dp"
        android:layout_height="160dp"
        android:layout_marginTop="132dp"
        android:background="@drawable/circled_button"
        android:fontFamily="sans-serif"
        android:lineSpacingExtra="10sp"
        android:text="SCAN"
        android:textAllCaps="false"
        android:textSize="30sp"
        android:textStyle="bold"
        android:typeface="monospace"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/goTO_log"
        android:layout_width="78dp"
        android:layout_height="34dp"
        android:layout_marginTop="72dp"
        android:text="log"
        android:textSize="10sp"
        android:background="@drawable/round_botton_2"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/changeStatus" />

    <EditText
        android:id="@+id/editText"
        android:layout_width="128dp"
        android:layout_height="54dp"
        android:layout_marginBottom="208dp"
        android:ems="10"
        android:inputType="number"
        android:textAlignment="center"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/mhelp"
        android:layout_width="42dp"
        android:layout_height="39dp"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="216dp"
        android:background="@drawable/question_button"
        android:text="\?"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toEndOf="@+id/editText" />

    <Button
        android:id="@+id/mCancel"
        android:layout_width="28dp"
        android:layout_height="28dp"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="160dp"
        android:background="@drawable/round_botton_2"
        android:text="×"
        android:textSize="10sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.033"
        app:layout_constraintStart_toEndOf="@+id/changeStatus" />

</android.support.constraint.ConstraintLayout>
```

