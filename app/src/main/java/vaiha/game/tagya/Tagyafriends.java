package vaiha.game.tagya;

public class Tagyafriends {
    String id;
    String imagelink;
    String level;
    String name;
    String unfriend;

    public Tagyafriends(String paramString) {
        this.name = paramString;
    }

    public String getId() {
        return this.id;
    }

    public String getImagelink() {
        return this.imagelink;
    }

    public String getLevel() {
        return this.level;
    }

    public String getName() {
        return this.name;
    }

    public String getUnfriend() {
        return this.unfriend;
    }

    public void setId(String paramString) {
        this.id = paramString;
    }

    public void setImagelink(String paramString) {
        this.imagelink = paramString;
    }

    public void setLevel(String paramString) {
        this.level = paramString;
    }

    public void setName(String paramString) {
        this.name = paramString;
    }

    public void setUnfriend(String paramString) {
        this.unfriend = paramString;
    }
}
