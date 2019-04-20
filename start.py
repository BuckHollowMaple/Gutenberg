# Download only epubs
for x in xrange(0, 4698):
    test = os.popen('casperjs gather.js --num="%s"' % str(x)).read().replace('\n','').split(',')
    for each in test:
        if '.epub' in each:
            url = 'http://127.0.0.1:8000/gutenberg_en_all_2018-10'+each.split('..')[1]
            if not url in listing: 
                os.system('wget "%s"' % url)

# Correct the name
import glob
test = glob.glob('/root/book_test/*.epub')
for each in test:
    os.system('mv %s %s' % (each,each.split('.')[-3]+'.epub'))
