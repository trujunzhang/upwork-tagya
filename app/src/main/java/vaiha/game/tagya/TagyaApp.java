package vaiha.game.tagya;

import android.annotation.TargetApi;
import android.app.Application;
import android.content.res.Resources;
import android.os.Build;
import android.webkit.WebView;

import vaiha.game.tagya.util.ApiUtil;
import vaiha.game.tagya.util.ReleaseUtil;

public class TagyaApp extends Application {
    private float screenDensity;

    public float getScreenDensity() {
        return screenDensity;
    }


    public boolean isProdRelease() {
        return ReleaseUtil.isProdRelease();
    }

    public boolean isPreProdRelease() {
        return ReleaseUtil.isPreProdRelease();
    }

    public boolean isAlphaRelease() {
        return ReleaseUtil.isAlphaRelease();
    }

    public boolean isPreBetaRelease() {
        return ReleaseUtil.isPreBetaRelease();
    }

    public boolean isDevRelease() {
        return ReleaseUtil.isDevRelease();
    }


    /**
     * Singleton instance of WikipediaApp
     */
    private static TagyaApp INSTANCE;

    public TagyaApp() {
        INSTANCE = this;
    }

    /**
     * Returns the singleton instance of the WikipediaApp
     * <p/>
     * This is ok, since android treats it as a singleton anyway.
     */
    public static TagyaApp getInstance() {
        return INSTANCE;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        final Resources resources = getResources();
        screenDensity = resources.getDisplayMetrics().density;

        // Integrating with Stetho is intended to be seamless and straightforward for most existing Android applications.
//        Stetho.initializeWithDefaults(this);

    }

    @TargetApi(Build.VERSION_CODES.KITKAT)
    private void enableWebViewDebugging() {
        if (BuildConfig.DEBUG && ApiUtil.hasKitKat()) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
    }

}
