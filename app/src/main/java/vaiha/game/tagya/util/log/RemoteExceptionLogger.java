package vaiha.game.tagya.util.log;

import android.support.annotation.NonNull;

public interface RemoteExceptionLogger {
    void log(@NonNull Throwable throwable);
}