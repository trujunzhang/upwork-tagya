package vaiha.game.tagya;

import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.PopupWindow;

import android.annotation.TargetApi;
import android.app.SearchManager;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.location.Location;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.Toolbar;
import android.support.v7.view.ActionMode;
import android.text.Html;
import android.text.TextUtils;
import android.text.format.DateUtils;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

public class World_Levels_1 extends AppCompatActivity {
    static final String TAGYA_USER_ID = "tagya_id";
    Dialog dialog;
    String game_name;
    String go;
    private int height;
    String image;
    SharedPreferences mSharedPreferences;
    ProgressDialog pDialog;
    PopupWindow pop_window;
    String str = "";
    String unique_id;
    String url;
    private int width;
    String world_level;

    private TagyaApp app;
    private View fragmentContainerView;


    public View getContentView() {
        return fragmentContainerView;
    }


    /**
     * Get the Fragment that is currently at the top of the Activity's backstack.
     * This activity's fragment container will hold multiple fragments stacked onto
     * each other using FragmentManager, and this function will return the current
     * topmost Fragment. It's up to the caller to cast the result to a more specific
     * fragment class, and perform actions on it.
     *
     * @return Fragment at the top of the backstack.
     */
    public Fragment getTopFragment() {
        return getSupportFragmentManager().findFragmentById(R.id.content_fragment_container);
    }

    /**
     * Get the PageViewFragment that is currently at the top of the Activity's backstack.
     * If the current topmost fragment is not a PageViewFragment, return null.
     *
     * @return The PageViewFragment at the top of the backstack, or null if the current
     * top fragment is not a PageViewFragment.
     */
    @Nullable
    public PageFragment getCurPageFragment() {
        Fragment f = getTopFragment();
        if (f instanceof PageFragment) {
            return (PageFragment) f;
        } else {
            return null;
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        app = (TagyaApp) getApplicationContext();
        setContentView(R.layout.world_lay);

        fragmentContainerView = findViewById(R.id.content_fragment_container);

        if (savedInstanceState == null) {
            // if there's no savedInstanceState, and we're not coming back from a Theme change,
            // then we must have been launched with an Intent, so... handle it!
            handleIntent(getIntent());
        }
    }

    private void handleIntent(Intent intent) {
        pushFragment(new PageFragment());
        fragmentContainerView.post(new Runnable() {
            @Override
            public void run() {
                PageFragment frag = getCurPageFragment();
                if (frag == null) {
                    return;
                }
            }
        });
    }

    private void pushFragment(Fragment f) {
        // if the new fragment is the same class as the current topmost fragment,
        // then just keep the previous fragment there.
        // e.g. if the user selected History, and there's already a History fragment on top,
        // then there's no need to load a new History fragment.
        if (getTopFragment() != null && (getTopFragment().getClass() == f.getClass())) {
            return;
        }

        FragmentTransaction trans = getSupportFragmentManager().beginTransaction();
        trans.add(R.id.content_fragment_container, f);
        trans.addToBackStack(null);
        trans.commit();
    }

    // Note: back button first handled in {@link #onOptionsItemSelected()};
    @Override
    public void onBackPressed() {
        finish();
    }

}
