using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;

namespace Tryouts.GraphDatabase.IntegrationTests.BaseClasses
{
    public abstract class BaseIntegrationTest : IDisposable
    {
        private NullLoggerFactory _nullLoggerFactory;
        private IServiceCollection _services;
        private IConfiguration _configuration;
        private bool disposedValue;

        public BaseIntegrationTest()
        {
            _nullLoggerFactory = new NullLoggerFactory();
            _services = new ServiceCollection();
            _configuration = new ConfigurationBuilder().Build();
        }

        public NullLoggerFactory LoggerFactory => _nullLoggerFactory;
        public IServiceCollection Services => _services;
        public IConfiguration Configuration => _configuration;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _services = null;
                    _configuration = null;

                    if (_nullLoggerFactory != null) _nullLoggerFactory.Dispose();
                    _nullLoggerFactory = null;
                }

                disposedValue = true;
            }
        }

        ~BaseIntegrationTest()
        {
            Dispose(disposing: false);
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
