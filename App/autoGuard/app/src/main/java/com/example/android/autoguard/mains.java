package com.example.android.autoguard;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;
import android.widget.Button;
import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import static android.Manifest.permission.READ_CONTACTS;

import java.util.ArrayList;

public class mains extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mains);
        if(1<0){
        TextView family = (TextView) findViewById(R.id.personApproval);

        // Set a click listener on that View
        family.setOnClickListener(new OnClickListener() {
            // The code in this method will be executed when the family category is clicked on.
            @Override
            public void onClick(View view) {
                // Create a new intent to open the {@link FamilyActivity}
                Intent familyIntent = new Intent(mains.this, confirmationPeople.class);

                // Start the new activity
                startActivity(familyIntent);
            }
        });}
        else
        {
            TextView family = (TextView) findViewById(R.id.personApproval);

            // Set a click listener on that View
            family.setOnClickListener(new OnClickListener() {
                // The code in this method will be executed when the family category is clicked on.
                @Override
                public void onClick(View view) {
                    // Create a new intent to open the {@link FamilyActivity}
                    Intent familyIntent = new Intent(mains.this, t1.class);

                    // Start the new activity
                    startActivity(familyIntent);
                }
            });
        }
    }

    public void carapp(View v){
        Button p1_button = (Button)findViewById(R.id.carApprovalStatus);
        p1_button.setText("Approved");
    }

}