'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 shadow-sm rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Privacy Policy</h1>

                <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
                    <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">1. Introduction</h2>
                    <p>
                        Welcome to Future Store ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from)
                        and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">2. The Data We Collect About You</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">3. How We Use Your Personal Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>


                    <p className="mt-4">
                        Alternatively, you can contact us at <strong>support@futurestore.com</strong> to request data deletion.
                    </p>

                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">4. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>support@futurestore.com</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
