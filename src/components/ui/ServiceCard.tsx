import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Award, Scale, Landmark, BarChart3, BookOpen, Briefcase, 
  Building, Building2, Calculator, CheckCircle, Coins, Compass, 
  CreditCard, Database, DollarSign, Edit, ExternalLink, Eye, 
  FileText, Filter, Flag, Folder, Globe, TrendingUp, Handshake, 
  Heart, HelpCircle, Home, Key, Layers, LineChart, Lock, Mail, 
  Map, MapPin, Network, Package, Palette, Phone, PieChart, Plane, 
  Rocket, Search, Settings, ShieldCheck, ShoppingBag, Star, 
  Target, Users, Wallet, Zap 
} from 'lucide-react';
import styles from './ServiceCard.module.scss';

const iconMap: Record<string, any> = {
  ArrowRight, Award, Scale, Landmark, BarChart3, BookOpen, Briefcase, 
  Building, Building2, Calculator, CheckCircle, Coins, Compass, 
  CreditCard, Database, DollarSign, Edit, ExternalLink, Eye, 
  FileText, Filter, Flag, Folder, Globe, TrendingUp, Handshake, 
  Heart, HelpCircle, Home, Key, Layers, LineChart, Lock, Mail, 
  Map, MapPin, Network, Package, Palette, Phone, PieChart, Plane, 
  Rocket, Search, Settings, ShieldCheck, ShoppingBag, Star, 
  Target, Users, Wallet, Zap 
};

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
  iconName: string;
  category?: string;
  ctaText?: string;
  className?: string;
}

export function ServiceCard({ title, description, slug, iconName, ctaText, className }: ServiceCardProps) {
  const Icon = iconMap[iconName] || Briefcase;

  return (
    <Link href={`/our-capabilities/${slug}`} className={`${styles.serviceCard} ${className || ""}`}>
      <div className={styles.iconWrapper}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.footer}>
        {ctaText && <span className={styles.ctaLabel}>{ctaText}</span>}
        <ArrowRight className={styles.arrow} size={24} />
      </div>
    </Link>
  );
}
