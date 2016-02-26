package vaiha.game.tagya;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class Splashscreen extends AppCompatActivity {

    public String PREF_NAME = "LOGIN";
    SharedPreferences.Editor editor;
    SharedPreferences prefs;
    String restoredText;
    String userid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.splash);
    }
}
