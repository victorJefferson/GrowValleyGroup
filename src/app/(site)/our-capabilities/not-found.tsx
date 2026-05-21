import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Search } from 'lucide-react';
import styles from './not-found.module.scss';

export default function CapabilitiesNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <Search className="w-12 h-12 text-slate-300" />
          </div>
        </div>
        
        <h1 className={styles.heading}>
          Content Not Found
        </h1>
        
        <p className={styles.description}>
          The service or pillar you are looking for hasn&apos;t been published yet or the link is incorrect. 
          Please check your CMS settings or return to our capabilities overview.
        </p>
        
        <div className={styles.buttonGroup}>
          <Link href="/our-capabilities">
            <Button variant="outline" size="lg" className={styles.backButton}>
              <ArrowLeft size={20} /> Back to Capabilities
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg">
              Talk to an Advisor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
