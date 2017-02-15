class Tree {
    double w, h; // Width and height.
    double x, y, prelim, mod, shift, change;
    Tree tl, tr; // Left and right thread.
    Tree el, er; // Extreme left and right nodes.
    double msel, mser; // Sum of modifiers at the extreme nodes.
    Tree[] c;
    int cs; // Array of children and number of children.

    Tree(double w, double h, double y, Tree... c) {
        this.w = w;
        this.h = h;
        this.y = y;
        this.c = c;
        this.cs = c.length;
    }
}

    void layout(Tree t) {
        firstWalk(t);
        secondWalk(t, 0);
    }

    void firstWalk(Tree t) {
        if (t.cs == 0) {
            setExtremes(t);
            return;
        }
        firstWalk(t.c[0]);
        // Create siblings in contour minimal vertical coordinate and index list.
        IYL ih = updateIYL(bottom(t.c[0].el), 0, null);
        for (int i = 1; i < t.cs; i++) {

            firstWalk(t.c[i]);
            //Store lowest vertical coordinate while extreme nodes still point in current subtree.
            double minY = bottom(t.c[i].er);
            separate(t, i, ih);
            ih = updateIYL(minY, i, ih);
        }
        positionRoot(t);
        setExtremes(t);
    }

    void setExtremes(Tree t) {
        if (t.cs == 0) {
            t.el = t;
            t.er = t;
            t.msel = t.mser = 0;
        } else {
            t.el = t.c[0].el;
            t.msel = t.c[0].msel;
            t.er = t.c[t.cs - 1].er;
            t.mser = t.c[t.cs - 1].mser;
        }
    }

    void separate(Tree t, int i, IYL ih) {
        // Right contour node of left siblings and its sum of modfiers.
        Tree sr = t.c[i - 1];
        double mssr = sr.mod;
        // Left contour node of current subtree and its sum of modfiers.
        Tree cl = t.c[i];
        double mscl = cl.mod;
        while (sr != null && cl != null) {
            if (bottom(sr) > ih.lowY) ih = ih.nxt;
            // How far to the left of the right side of sr is the left side of cl?
            double dist = (mssr + sr.prelim + sr.w) - (mscl + cl.prelim);
            if (dist > 0) {
                mscl += dist;
                moveSubtree(t, i, ih.index, dist);
            }
            double sy = bottom(sr), cy = bottom(cl);
            // Advance highest node(s) and sum(s) of modifiers (Coordinate system increases downwards)
            if (sy <= cy) { ?
                sr = nextRightContour(sr);
                if (sr != null) mssr += sr.mod;
            } ?
            if (sy >= cy) { ?
                cl = nextLeftContour(cl);
                if (cl != null) mscl += cl.mod;
            } ?
        }
        // Set threads and update extreme nodes.
        // In the first case, the current subtree must be taller than the left siblings.
        if (sr == null && cl != null) setLeftThread(t, i, cl, mscl);
            // In this case, the left siblings must be taller than the current subtree.
        else if (sr != null && cl == null) setRightThread(t, i, sr, mssr);
    }

    void moveSubtree(Tree t, int i, int si, double dist) {
        // Move subtree by changing mod.
        t.c[i].mod += dist;
        t.c[i].msel += dist;
        t.c[i].mser += dist;
        distributeExtra(t, i, si, dist);
    }


    Tree nextLeftContour(Tree t) {
        return t.cs == 0 ? t.tl : t.c[0];
    }

    Tree nextRightContour(Tree t) {
        return t.cs == 0 ? t.tr : t.c[t.cs - 1];
    }

    double bottom(Tree t) {
        return t.y + t.h;
    }

    void setLeftThread(Tree t, int i, Tree cl, double modsumcl) {
        Tree li = t.c[0].el;
        li.tl = cl;
        // Change mod so that the sum of modifier after following thread is correct.
        double diff = (modsumcl - cl.mod) - t.c[0].msel;
        li.mod += diff;
        // Change preliminary x coordinate so that the node does not move.
        li.prelim -= diff;
        // Update extreme node and its sum of modifiers.
        t.c[0].el = t.c[i].el;
        t.c[0].msel = t.c[i].msel;
    }

    // Symmetrical to setLeftThread.
    void setRightThread(Tree t, int i, Tree sr, double modsumsr) {
        Tree ri = t.c[i].er;
        ri.tr = sr;
        double diff = (modsumsr - sr.mod) - t.c[i].mser;
        ri.mod += diff;
        ri.prelim -= diff;
        t.c[i].er = t.c[i - 1].er;
        t.c[i].mser = t.c[i - 1].mser;
    }

    void positionRoot(Tree t) {
        // Position root between children, taking into account their mod.
        t.prelim = (t.c[0].prelim + t.c[0].mod + t.c[t.cs - 1].mod +
                t.c[t.cs - 1].prelim + t.c[t.cs - 1].w) / 2 - t.w / 2;
    }

    void secondWalk(Tree t, double modsum) {
        modsum += t.mod;
        // Set absolute (non-relative) horizontal coordinate.
        t.x = t.prelim + modsum;
        addChildSpacing(t);
        for (int i = 0; i < t.cs; i++) secondWalk(t.c[i], modsum);
    }

    void distributeExtra(Tree t, int i, int si, double dist) {
        // Are there intermediate children?
        if (si != i - 1) {
            double nr = i - si;
            t.c[si + 1].shift += dist / nr;
            t.c[i].shift -= dist / nr;
            t.c[i].change -= dist - dist / nr;
        }
    }

    // Process change and shift to add intermediate spacing to mod.
    void addChildSpacing(Tree t) {
        double d = 0, modsumdelta = 0;
        for (int i = 0; i < t.cs; i++) {
            d += t.c[i].shift;
            modsumdelta += d + t.c[i].change;
            t.c[i].mod += modsumdelta;
        }
    }

// A linked list of the indexes of left siblings and their lowest vertical coordinate.
class IYL {
    double lowY;
    int index;
    IYL nxt;

    public IYL(double lowY, int index, IYL nxt) {
        this.lowY = lowY;
        this.index = index;
        this.nxt = nxt;
    }
}

    IYL updateIYL(double minY, int i, IYL ih) {
        // Remove siblings that are hidden by the new subtree.
        while (ih != null && minY >= ih.lowY) ih = ih.nxt;
        // Prepend the new subtree.
        return new IYL(minY, i, ih);
    }
